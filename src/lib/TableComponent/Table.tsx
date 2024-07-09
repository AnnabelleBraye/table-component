import { ChangeEvent, useEffect, useState } from "react"
import Footer from "./Footer"
import Header from "./Header"
import Row from "./Row"
import React from "react"

export type ColType<T> = {
  title: string,
  property: keyof T
}

export type TableProps<T> = {
  data: T[],
  columns: ColType<T>[],
}

const Table = <T,>({data, columns}: TableProps<T>) => {
  const {
    currentPage,
    sortedData,
    startIndex,
    endIndex,
    totalPages,
    columnsMaxWidth,
    currentData,
    itemsPerPage,
    sortProperty,
    handleSelectChange,
    handleChangeFilter,
    handlePrevious,
    handleNext,
    sortList
  } = useTable({data, columns});

  return (
    <div className="w-full">
      {/* Search + Table */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <input
            className="p-1 border border-grey rounded-sm w-1/2 md:w-1/3"
            placeholder="Search"
            onChange={(e) => handleChangeFilter(e)}
          />
          <div className="flex gap-2">
            <span className="text-sm font-bold">Show on page</span>
            <select
              id="showOnPage" 
              className="border border-gray-300 rounded"
              value={itemsPerPage}
              onChange={handleSelectChange}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-scroll">
          <table className="overflow-scroll w-full max-w-full">
            <thead>
              <tr className="bg-gray-200 border-y-2 border-solid border-gray-400 rounded-sm">
                {columns.map((col, index) => (
                  <Header
                    key={index} 
                    title={col.title} 
                    onClick={() => sortList(col.property)}
                    sortProperty={sortProperty}
                    actualProperty={col.property}
                    columnsMaxWidth={columnsMaxWidth}  
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((val, dataIndex) => (          
                <Row
                  key={dataIndex}
                  columns={columns}
                  val={val}
                  columnsMaxWidth={columnsMaxWidth}
                  totalRows={data.length - 1}
                  rowIndex={dataIndex} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <Footer
                  columnsLength={columns.length} 
                  handlePrevious={handlePrevious} 
                  handleNext={handleNext} 
                  currentPage={currentPage} 
                  totalPages={totalPages}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  totalData={sortedData.length}
                  />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

const useTable = <T,>({data, columns}: TableProps<T>) => {
  const nbOfTitles = columns.length;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(localStorage.getItem('itemsPerPage') ? JSON.parse(localStorage.getItem('itemsPerPage') || '') : 5);
  const [sortedData, setSortedData] = useState<T[]>(data);
  const [sortProperty, setSortProperty] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterString, setFilterString] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(getTotalPages(sortedData, itemsPerPage));
  const [startIndex, setStartIndex] = useState<number>(getStartIndex(currentPage, itemsPerPage));
  const [endIndex, setEndIndex] = useState<number>(startIndex + itemsPerPage);
  const [currentData, setCurrentData] = useState<T[]>(getCurrentData(sortedData, startIndex, endIndex));
  
  const columnsMaxWidth = getColumnsMaxWidth(nbOfTitles);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage])

  useEffect(() => {
    setStartIndex(getStartIndex(currentPage, itemsPerPage));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    setTotalPages(getTotalPages(sortedData, itemsPerPage));
    setEndIndex(startIndex + itemsPerPage);
  }, [itemsPerPage, startIndex, sortedData]);

  useEffect(() => {
    setCurrentData(getCurrentData(sortedData, startIndex, endIndex));
  }, [startIndex, endIndex, sortedData]);

  useEffect(() => {
    const properties = columns.map(col => col.property);
    const newList = getNewList(data, properties, filterString);
    setSortedData(newList);
    setCurrentPage(1);
  }, [columns, filterString, data]);

  /**
   * Update itemsPerPage value
   * @param e Change event
   */
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value) || 5);
    localStorage.setItem('itemsPerPage', e.target.value);
  }

  /**
   * Add 1 to currentPage value
   */
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  /**
   * Remove 1 to currentPage value
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  /**
   * Sort list from property
   * @param property Property of T object type
   */
  const sortList = (property: keyof T) => {
    const isSameProperty = property === sortProperty;
    const newSortOrder = isSameProperty && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortProperty(property);

    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return newSortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return newSortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    setSortedData(sorted);
  };

  /**
   * Update filter string
   * @param e Change event
   */
  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterString(e.target.value);
  }

  return {
    currentPage,
    itemsPerPage,
    sortedData,
    sortProperty,
    filterString,
    totalPages,
    startIndex,
    endIndex,
    currentData,
    columnsMaxWidth,
    setCurrentPage,
    setItemsPerPage,
    setSortedData,
    setSortProperty,
    setFilterString,
    setTotalPages,
    setStartIndex,
    setEndIndex,
    setCurrentData,
    handleSelectChange,
    handleChangeFilter,
    handlePrevious,
    handleNext,
    sortList,
  }
}

/**
 * Get the total of pages
 * @param data T data
 * @param itemsPerPage Number of items per page 
 * @returns Number
 */
const getTotalPages = <T,>(data: T[], itemsPerPage: number): number => {
  return Math.ceil(data.length / itemsPerPage)
}

/**
 * Get the max width for table columns
 * @param nbOfTitles Number of titles
 * @returns Number
 */
const getColumnsMaxWidth = (nbOfTitles: number): number => {
  const { innerWidth: width } = window;

  return Math.floor((width/nbOfTitles))
}

/**
 * Get the start index to get data
 * @param currentPage The current page
 * @param itemsPerPage The number of items per page
 * @returns Number
 */
const getStartIndex = (currentPage: number, itemsPerPage: number): number => {
  return (currentPage - 1) * itemsPerPage;
}

/**
 * Get a segment of T data
 * @param data T data
 * @param startIndex Start index
 * @param endIndex endIndex
 * @returns T data
 */
const getCurrentData = <T,>(data: T[], startIndex: number, endIndex: number): T[] => {
  return data.slice(startIndex, endIndex)
}

/**
 * Get filtered list
 * @param data T data
 * @param properties T properties
 * @param filterString String to filter data
 * @returns T data
 */
const getNewList = <T,>(data: T[], properties: (keyof T)[], filterString: string): T[] => {
  return data.filter((item) =>
    properties.some((property) => {
      const value = item[property];
      return typeof value === "string" && value.toLowerCase().includes(filterString.toLocaleLowerCase());
    })
  );
}

export default Table