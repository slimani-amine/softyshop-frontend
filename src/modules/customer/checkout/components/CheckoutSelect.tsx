import React from "react";
import { Select } from "antd";
import { addDays } from "date-fns";
import { useAppDispatch, useAppSelector } from "@src/modules/shared/store";
import { setTime, setDate } from "../../data/checkoutSlice";

function formatDate(DATE: Date) {
  const date =
    Number(DATE.getDate()) <= 9 ? `0${DATE.getDate()}` : DATE.getDate();
  const month = getMonth(today);
  return `${date} ${month}`;
}

function getMonth(day: any) {
  return day.toLocaleString("default", { month: "long" });
}

const today = new Date();

const possibleDeliveryDates = [
  formatDate(addDays(today, 2)),
  formatDate(addDays(today, 3)),
  formatDate(addDays(today, 4)),
  formatDate(addDays(today, 5)),
  formatDate(addDays(today, 6)),
  formatDate(addDays(today, 7)),
  formatDate(addDays(today, 8)),
  formatDate(addDays(today, 9)),
  formatDate(addDays(today, 10)),
];

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const CheckoutSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const date: //  { payload: string | null; type: string | null } | null
  any = useAppSelector((state) => state.checkout.deliveryDate);
  const time: //  { payload: string | null; type: string | null } | null
  any = useAppSelector((state) => state.checkout.deliveryTime);



  return (
    <>
      <Select
        style={{ width: "380px" }}
        showSearch
        placeholder="Delivery Date"
        optionFilterProp="date"
        filterOption={filterOption}
        options={possibleDeliveryDates.map((day) => {
          return { value: day, label: day };
        })}
        value={date?.payload}
        onChange={(value: any) => dispatch(setDate(value))}
      />
      <Select
        style={{ width: "380px", marginLeft: "18px" }}
        showSearch
        placeholder="Delivery Time"
        optionFilterProp="time"
        filterOption={filterOption}
        options={[
          {
            value: "9h - 11h",
            label: "9h - 11h",
          },
          {
            value: "11h - 13h",
            label: "11h - 13h",
          },
          {
            value: "13h - 15h",
            label: "13h - 15h",
          },
          {
            value: "17h - 19h",
            label: "17h - 19h",
          },
        ]}
        value={time?.payload}
        onChange={(value: any) => dispatch(setTime(value))}
      />
    </>
  );
};

export default CheckoutSelect;
