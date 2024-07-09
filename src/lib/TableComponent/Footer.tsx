type FooterProps = {
  columnsLength: number,
  handlePrevious: () => void,
  handleNext: () => void,
  currentPage: number,
  totalPages: number,
  startIndex: number,
  endIndex: number,
  totalData: number
}

const Footer = ({
  columnsLength,
  handlePrevious,
  handleNext,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalData
}: FooterProps) => {
  return (
    <td colSpan={columnsLength} className="p-2">
      <div className="flex justify-between">
        <p>Showing {startIndex + 1} to {endIndex > totalData ? totalData : endIndex} of {totalData} entries</p>
        <div>
          <button className={`mr-2 ${currentPage === 1 ? 'text-gray-400' : ''}`} disabled={currentPage === 1} onClick={handlePrevious}>
            Previous
          </button>
          <span className="underline">{currentPage}</span>
          <button
            className={`ml-2 ${currentPage === totalPages ? 'text-gray-400' : ''}`}
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </td>
  )
}

export default Footer