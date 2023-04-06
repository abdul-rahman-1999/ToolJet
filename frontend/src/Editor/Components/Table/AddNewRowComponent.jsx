import React from 'react';

export function AddNewRowComponent({ newRowData, hideAddNewRowPopup, tableType, darkMode }) {
  console.log('table--- table type', tableType);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = newRowData;

  return (
    <div className="table-add-new-row card">
      <div className="card-header row">
        <div className="col">
          <h4 data-cy={`header-filters`} className="font-weight-normal">
            Add new row
          </h4>
        </div>
        <div className="col-auto">
          <button data-cy={`button-close-filters`} onClick={hideAddNewRowPopup} className="btn btn-light btn-sm">
            x
          </button>
        </div>
      </div>
      <div className="table-responsive jet-data-table">
        <table
          {...getTableProps()}
          className={`table table-vcenter table-nowrap ${tableType} ${darkMode && 'table-dark'}`}
        >
          <thead>
            {headerGroups.map((headerGroup, index) => {
              return (
                <tr className="tr" key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => {
                    return (
                      <th key={index} {...column.getHeaderProps()} className="th">
                        <div>{column.render('Header')}</div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={index} className="table-row" {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    let cellProps = cell.getCellProps();
                    const isEditable = true;
                    return (
                      <td key={index} {...cellProps} style={{ ...cellProps.style }}>
                        <div
                          className={`td-container ${cell.column.columnType === 'image' && 'jet-table-image-column'} ${
                            cell.column.columnType !== 'image' && 'w-100 h-100'
                          }`}
                        >
                          {cell.render('Cell', { cell, isEditable })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card-footer">
        <button className="btn btn-light btn-sm">+ add row</button>
        <button onClick={hideAddNewRowPopup} className="btn btn-light btn-sm mx-2">
          discard row
        </button>
      </div>
    </div>
  );
}
