import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import MaterialReactTable from 'material-react-table';



export default function DataTable() {
  const getimportData = useSelector((state) => state.marketplace.importData);

  const [validationErrors, setValidationErrors] = useState({});

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
      };
    },
    [validationErrors],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: 'sku',
        header: 'SKU',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: 'asin',
      //   header: 'ASIN',
      //   size: 140,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      {
        accessorKey: 'retail_price',
        header: 'Retail Price',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'business_price',
        header: 'Business Price',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'fulfilType',
        header: 'Fulfilment Type',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'Marketplace',
        header: 'Marketplace',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
    ],
    [],
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MaterialReactTable
        columns={columns}
        data={getimportData}
        editingMode="modal" //default
        enableColumnOrdering
        renderTopToolbarCustomActions={() => (
          <div style={{ fontSize:'20px', fontWeight:'bold', display: 'flex' }}>
            Imported Data
          </div>
        )}
      />
    </div>
  );
}