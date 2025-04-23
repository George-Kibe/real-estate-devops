const Table = ({
    columns,
    renderRow,
    className,
    headerClassName,
    hidden=false,
    data,
  }) => {
    return (
      <table className="w-full mt-4">
        <thead className={`${hidden} ? "hidden" : "" text-lg ${headerClassName}`}>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((col) => (
              <th key={col.accessor} className={col.className}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    );
  };
  
  export default Table;