import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

type HeaderProps<T> = {
  title: string,
  onClick: () => void,
  sortProperty: keyof T | null,
  actualProperty: keyof T,
  columnsMaxWidth: number,
}

const Header = <T,>({title, onClick, sortProperty, actualProperty, columnsMaxWidth}: HeaderProps<T>) => {
  
  return (
    <th 
      className={`text-start text-blue-grey font-normal p-4 hover:cursor-pointer ${actualProperty === sortProperty ? 'bg-gray-600 border-2 border-gray-600 text-white' : ' bg-gray-200 border-gray-200'} hover:bg-gray-600 hover:text-gray-300 hover:border-2 hover:border-gray-600`}
      style={{ maxWidth: `${columnsMaxWidth}px`, width: `${columnsMaxWidth}px` }}
    >
      <div
        className="flex justify-between items-center"
        onClick={onClick}
      >
        <span title={title} className="overflow-hidden text-ellipsis md:whitespace-nowrap">
          {title}
        </span>
        <span className="flex flex-col ml-4">
          <FontAwesomeIcon icon={faChevronUp} size='xs' />
          <FontAwesomeIcon icon={faChevronDown} size='xs' />
        </span>
      </div>
    </th>
  )
}

export default Header