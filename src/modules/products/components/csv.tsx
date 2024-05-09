import React from 'react';
import { useCSVReader } from 'react-papaparse';
import { useSelector } from 'react-redux';
import { RootState } from '@src/modules/shared/store';
import { useAllStoresQuery, useMyStoresQuery } from '@src/modules/bookStores/service/storeApi';
import {  Select, message } from 'antd';
import { useCreateManyProductsMutation } from '../service/productApi';
import Button from '@src/modules/shared/components/Button/Button';
interface CSVProps {}

const CSV: React.FC<CSVProps> = () => {
    const { CSVReader } = useCSVReader();
    const Current_User = useSelector((state: RootState) => state.auth.user?.role.toLocaleUpperCase());
    const { data: fetchedMyStores } = useMyStoresQuery();
    const { data: fetchedAllStores } = useAllStoresQuery();

    const stores = Current_User === 'VENDOR' ? fetchedMyStores?.data?.docs : fetchedAllStores?.data?.docs;

    const selectStores = stores?.map((store: any) => ({
        label: store.name,
        value: store.id,
    }));

    const [createProducts] = useCreateManyProductsMutation();
    const [result, setResult] = React.useState<any[]>([]);

    const handleUploadAccepted = (results: any) => {
        console.log('---------------------------');
        console.log(results.data);
        const data = results.data;
        console.log('---------------------------');

        const keys = data[0]; // Extract keys from the first row of data

        for (let i = 1; i < data.length; i++) {
            const obj: any = {};
            for (let j = 0; j < keys.length; j++) {
                if (data[i][j] !== undefined) {
                    // Check if data[i][j] is not undefined
                    if (keys[j] === 'images') {
                        // Split the 'images' string into an array of URLs
                        obj[keys[j]] = data[i][j].split(',');
                    } else if (['category_id', 'discount', 'initialPrice', 'stockNumber'].includes(keys[j])) {
                        // Parse fields as integers
                        obj[keys[j]] = parseInt(data[i][j], 10);
                    } else {
                        obj[keys[j]] = data[i][j];
                    }
                }
            }
            setResult((prevResult) => [...prevResult, obj]);
        }
        console.log('Result:', result);
    };

    const handleSaveClick = async () => {
        const response = await createProducts({
            id: 22,
            newProducts: result,
        });
        if ('data' in response) {
            // Display success message if data exists
            message.success('Product saved successfully!');
            console.log(response.data);
        } else if ('error' in response) {
            // Display error message if error exists
            message.error('Failed to save product. Please try again.');
            console.error('Error saving product', response.error);
        } else {
            // Handle unexpected response format
            message.error('Unexpected response from server. Please try again later.');
        }
    };

    return (
        <CSVReader onUploadAccepted={handleUploadAccepted}>
            {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }: any) => (
                <div className='container-csv'>
                    <div className='csv-upload'>
                        <button type='button' {...getRootProps()} className='add-cat'>
                            Upload CSV file
                        </button>
                        {acceptedFile && (
                            <>
                                <div>{acceptedFile.name}</div>
                                <Button
                                    style={{ height: '40px' }}
                                    size='xl'
                                    variant='dark'
                                    onClick={handleSaveClick}
                                >
                                    Insert Data
                                </Button>
                                <Select
                                    style={{
                                        width: '200px',
                                        height: '8px !important',
                                        borderRadius: '30px',
                                    }}
                                    size='small'
                                    placeholder='Store '
                                    options={selectStores}
                                    className='input-custom'
                                />
                                <button {...getRemoveFileProps()} className='add-remove-csv'>
                                    Remove
                                </button>
                            </>
                        )}
                    </div>
                    <ProgressBar />
                </div>
            )}
        </CSVReader>
    );
};

export default CSV;
