import React from "react";
import { ColType } from "./Table";

type RowProps<T> = {
  columns: ColType<T>[],
  val: T,
  columnsMaxWidth: number,
  totalRows: number,
  rowIndex: number
}

const Row = <T,>({columns, val, columnsMaxWidth, totalRows, rowIndex}: RowProps<T>) => { 
  return (
    <React.Fragment>
      <tr className={`hover:bg-gray-100  ${rowIndex === totalRows ? 'border-b-2 border-gray-400' : 'border-b'}`}>
        {columns.map((prop, propIndex) => (
          <td 
            key={propIndex} 
            title={`${val[prop.property]}`}
            className={`text-ellipsis whitespace-nowrap overflow-hidden p-4 min-w-32 md:min-w-min`}
            style={{ maxWidth: `${columnsMaxWidth}px`, width: `${columnsMaxWidth}px` }} 
          >
            {`${val[prop.property]}`}
          </td>
        ))}
      </tr>
    </React.Fragment>
  )
}

export default Row