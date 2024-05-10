import React, { useState } from "react";
import { useCSVReader } from "react-papaparse";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import {
  useAllStoresQuery,
  useMyStoresQuery,
} from "@src/modules/bookStores/service/storeApi";
import { Select, message } from "antd";
import { useCreateManyProductsMutation } from "../service/productApi";
import Button from "@src/modules/shared/components/Button/Button";

interface CSVProps {}

const CSV: React.FC<CSVProps> = () => {
  const { CSVReader } = useCSVReader();
  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase(),
  );
  const { data: fetchedMyStores } = useMyStoresQuery();
  const { data: fetchedAllStores } = useAllStoresQuery();

  const stores =
    Current_User === "VENDOR"
      ? fetchedMyStores?.data?.docs
      : fetchedAllStores?.data?.docs;

  const selectStores = stores?.map((store: any) => ({
    label: store.name,
    value: store.id,
  }));

  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [createProducts] = useCreateManyProductsMutation();
  const [result, setResult] = useState<any[]>([]);

  const handleUploadAccepted = (results: any) => {
    const data = results.data;
    const keys = data[0];

    for (let i = 1; i < data.length; i++) {
      const obj: any = {};
      for (let j = 0; j < keys.length; j++) {
        if (data[i][j] !== undefined) {
          let key = String(keys[j]);
          if (key === "images") {
            obj[key] = data[i][j].split(",");
          } else if (
            ["category_id", "discount", "initialPrice", "stockNumber"].includes(
              key,
            )
          ) {
            obj[key] = parseInt(data[i][j], 10);
          } else {
            obj[key] = data[i][j];
          }
        }
      }
      setResult((prevResult) => [...prevResult, obj]);
    }
  };

  const handleSaveClick = async () => {
    if (!selectedStoreId) {
      message.error("Please select a store.");
      return;
    }

    const resultJSON = JSON.stringify(result);

    const response = await createProducts({
      id: selectedStoreId,
      newProducts: resultJSON,
    });

    if ("data" in response) {
      message.success("Product saved successfully!");
    } else if ("error" in response) {
      message.error("Failed to save product. Please try again.");
    } else {
      message.error("Unexpected response from server. Please try again later.");
    }
  };

  return (
    <CSVReader onUploadAccepted={handleUploadAccepted}>
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <div className="container-csv">
          <div className="csv-upload">
            <button type="button" {...getRootProps()} className="add-cat">
              Upload CSV file
            </button>
            {acceptedFile && (
              <>
                <div>{acceptedFile.name}</div>
                <div className="select-csv">
                  <Select
                    style={{
                      width: "200px",
                      height: "8px !important",
                      borderRadius: "30px",
                    }}
                    size="small"
                    placeholder="Select Store"
                    options={selectStores}
                    className="input-custom"
                    onChange={(value) => setSelectedStoreId(value as number)}
                  />
                </div>
                <div className="flex-btn">
                  <Button
                    style={{ height: "40px" }}
                    size="xl"
                    variant="dark"
                    onClick={handleSaveClick}
                  >
                    Insert Data
                  </Button>
                  <button {...getRemoveFileProps()} className="add-remove-csv">
                    Remove
                  </button>
                </div>
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
