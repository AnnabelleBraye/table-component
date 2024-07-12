# React Table Component Package

A library for displaying, sorting, and filtering tables in React applications.

## Installation

To install the library, use npm:

```bash
npm install react-table-component-package
```

## Usage
Import the Table component into your application and use it as follows:

```javascript
  import { Table, ColType, TableProps } from 'react-table-component-package';

  const data: User[] = [
    { id: 1, name: 'John Doe', age: 25, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Tom Johnson', age: 28, city: 'Chicago' },
  ];

  const columns: ColType<User> = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Age', key: 'age' },
    { header: 'City', key: 'city' },
  ];

  function App() {
    return (
      <div>
        <h2>User Table</h2>
        <Table data={data} columns={columns} />
      </div>
    );
  }
```

### Accepted Props (TableProps) ###
- **data**: An array of objects representing the data to display in the table.
- **columns**: An array of objects defining the columns of the table with headers (header) and data keys (key).

## Prerequisites ##
### System Prerequisites ###
- Node.js version 12 or higher.

## Dependencies ##
To use react-table-component-package, make sure your project includes Tailwind CSS. Add the following to your *tailwind.config.js* to ensure Tailwind can process styles within the react-table-component-package library:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  // other Tailwind CSS configurations
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-table-component-package/dist/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {},
  plugins: [],
}
```

Add a file **/types/react-table-component-package/index.d.ts**  inside your /src, with this content :

```typescript
// types/react-table-component-package/index.d.ts
declare module 'react-table-component-package' {
  import { FC } from 'react';
  import { TableProps, ColType } from 'react-table-component-package/dist/react-table-component-package.es.js';

  export const Table: FC<TableProps>;
  export { TableProps, ColType };
}
```

## API
- **Table**: The main component to display a table.
- **ColType**: Data type for the columns of the table.
- **TableProps**: Props accepted by the Table component.

## Contributions
Contributions are welcome! For any major changes, please open an issue for discussion or submit a pull request directly.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Support
For questions or issues, please open an issue on GitHub or email <annabelle.braye@gmail.com>.

