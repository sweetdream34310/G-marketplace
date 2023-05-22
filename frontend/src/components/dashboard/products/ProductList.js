import React, { useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box } from '@mui/material';
import { getItems } from "../../../api/sp_api/GetItems";
import { MARKETPLACE_TYPES } from '../../../actions/actionType';
import { BeatLoader } from "react-spinners";
import * as XLSX from 'xlsx';
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import PriceEdit from '../../dialog/Price/PriceEdit'
import '../../../style/home.css'
import TagAdd from '../../dialog/Tag/TagAdd'
import TagEdit from '../../dialog/Tag/TagEdit'
import Log from '../../dialog/Log/index'
import ImportCSV from "./ImportCSV"
import ImportExcel from "../../dialog/Price/ImportExcel"

const Example = ({ socket }) => {

  const dispatch = useDispatch();

  const displaydata = [
    {
      sku: 'Kelvin',
      asin: 'Langosh',
      fulfilType: 'Jerod14@hotmail.com',
      price: 19,
    },
  ]
  const [getDataFlag, setGetDataFlag] = useState(false);

  const setMarketPlace = useSelector((FulfilmentType) => FulfilmentType.marketplace.setMarketPlace);
  const priceUpdateReqStatus = useSelector((priceUpdateStatus) => priceUpdateStatus.marketplace.priceRequestStatus);

  const [tableData, setTableData] = useState(() => displaydata);
  const [exportData, setExportData] = useState([{
    sku: '',
    retail_price: '',
    business_price: '',
    fulfilType: '',
    Marketplace: '',
  }]);

  const [currencyDisplay, setCurrencyDisplay] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  const setCurrencyFunc = (marketplaceName) => {
    let currency = "EUR";
    if (marketplaceName == "Amazon.co.uk (UK)") {
      currency = "GBP";
    } else if (marketplaceName == "Amazon.se (Sweden)") {
      currency = "SEK";
    } else if (marketplaceName == "Amazon.pl (Poland)") {
      currency = "PLN";
    } else if (marketplaceName == "Amazon.tr (Turkey)") {
      currency = "TRY";
    } else {
      currency = "EUR";
    }
    return currency;
  };


  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const getMarketPlace = async () => {
    if (setMarketPlace != "") {
      setGetDataFlag(false);
      
      let data = {
        marketplaceName: setMarketPlace
      }
      
      let res = await getItems(data);
      
      if (res.data != "error") {
        // console.log(res.data)
        const sss = setCurrencyFunc(setMarketPlace)
        setCurrencyDisplay(sss)
        const tempData = [...res.data]
        

        setTableData(res.data)
        // setExportData(res.data)
        setGetDataFlag(true);
        dispatch({ type: MARKETPLACE_TYPES.GET_DATA_SUCCESS, payload: true });

        let data = [...tempData];
        // data.map((item) => {
        //   delete item.tag
        //   delete item.suggestedPrice
        // })

        // console.log(data)
        dispatch({ type: MARKETPLACE_TYPES.GET_SP_DATA, payload: data })
      } else {
        dispatch({ type: MARKETPLACE_TYPES.MARKETPLACE_SELECT, payload: "" });
        toast.error("Error happened. Please check your network.")
      }
    }
  }

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
      };
    },
    [validationErrors],
  );

  const priceUpdate = (index, suggestedPrice, action) => {

    if(action == 'price') {
      tableData[index].suggestedPrice = suggestedPrice
    } else if(action == 'business') {
      tableData[index].suggestedBusinessPrice = suggestedPrice
    }
    setTableData([...tableData]);
  }

  const priceUpdateWithArray = (updatedData) => {
    let data = [...tableData];
    data.map((item) => {
      updatedData.map((updatedItem) => {
        if (item.sku == updatedItem.sku) {
          item.suggestedPrice = updatedItem.price
        }
      })
    })

    setTableData(data);
  }

  const updateNewTag = (newTag, username, index) => {
    tableData[index].tag = `@${username} : ${newTag}`
    setTableData([...tableData]);
  }

  const updateEditTag = (editTag, username, index) => {
    if (editTag != "") {
      tableData[index].tag = `@${username} : ${editTag}`
    } else {
      tableData[index].tag = ''
    }
    setTableData([...tableData]);
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'sku',
        header: 'SKU',
        size: 100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'asin',
        header: 'ASIN',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'price',
        header: `Retail price`,
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'businessPrice',
        header: 'Business price',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'suggestedPrice',
        header: 'Suggested Retail',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'suggestedBusinessPrice',
        header: 'Suggested Business',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'fulfilType',
        header: 'Fulfilment Type',
        size: 50,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'tag',
        header: 'Tags',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          editingMode: 'cell',
          enableEditing: true
        }),
      },
    ],
    [getCommonEditTextFieldProps],
  );

  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new('adafaw');
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, 'import_template.xlsx');
  };

  const handleExport = async () => {
    let data = [...exportData];
    data.map((item) => {
      delete item.tag
      delete item.suggestedPrice
    })
    // setExportData(exportData)
    downloadExcel(data);
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50, //customize the default page size
  });

  useEffect(() => {
    getMarketPlace()
  }, [setMarketPlace])

  useEffect(() => {
    if (priceUpdateReqStatus) {
      getMarketPlace()
    }
  }, [priceUpdateReqStatus])

  return (
    <>
      {setMarketPlace == "" ?
        <div style={{ position: 'absolute', left: '40%', top: '50%', color: '#7b7b7b', fontSize: '20px', fontFamily: 'monospace' }}>Please drop down the marketplace</div> :
        !getDataFlag ?
          <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
            <BeatLoader color="#36d7b7" margin={2} size={18} />
          </div> :
          <MaterialReactTable
            displayColumnDefOptions={{
              'mrt-row-actions': {
                muiTableHeadCellProps: {
                  align: 'center',
                },
                size: 50,
              },
            }}
            columns={columns}
            data={tableData}
            editingMode="modal" //default
            // enableColumnOrdering
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            muiTablePaginationProps={{
              showFirstButton: true,
              showLastButton: true,
            }}
            onPaginationChange={setPagination}
            state={{ pagination }}
            // muiTableBodyRowProps={{defaultValue: 100}}
            renderRowActions={({ row, table, index }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <PriceEdit
                  priceUpdate={priceUpdate}
                  marketplace={setMarketPlace}
                  row={row._valuesCache}
                  index={row.index}
                  socket={socket}
                  tableData={tableData}
                />
                {(row._valuesCache.tag == undefined || row._valuesCache.tag == '') ?
                  <TagAdd
                    marketplace={setMarketPlace}
                    sku={row._valuesCache.sku}
                    updateNewTag={updateNewTag}
                    index={row.index}
                  />
                  :
                  <TagEdit
                    marketplace={setMarketPlace}
                    sku={row._valuesCache.sku}
                    updateEditTag={updateEditTag}
                    content={row._valuesCache.tag}
                    index={row.index}
                  />
                }
                <Log 
                  marketplace={setMarketPlace}
                  sku={row._valuesCache.sku}
                />
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <div style={{ display: 'flex' }}>
                <div className='export-button' onClick={handleExport}>
                  <div className='export-main-button'>
                    <div className='export-logo'></div>
                    <a className='export-label'>Export File</a>
                  </div>
                </div>
                <div style={{ width: '20px' }} />
                <ImportCSV handleModalOpen={setIsOpen} />
              </div>
            )}
          />
      }
      <ImportExcel priceUpdateWithArray={priceUpdateWithArray} isOpen={isOpen} handleModalOpen={setIsOpen} />
    </>
  );
};

export default Example;