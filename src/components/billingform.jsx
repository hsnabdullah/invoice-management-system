"use client";
import React, { useEffect, useRef } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import { validationSchema } from "./validationSchema";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PaymentTermsSelect } from "./paymenttermsselect";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Drawer, DrawerClose } from "./ui/drawer";
import { Trash2Icon } from "lucide-react";
import DatePicker from "./datePicker";
import { DayPicker } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
const initialValues = {
  streetAddress: "",
  city: "",
  postCode: "",
  country: "",
  clientName: "",
  clientEmail: "",
  clientStreetAddress: "",
  invoiceDate: "",
  paymentTerms: "",
  projectDescription: "",
  items: [{ itemName: "", quantity: 0, price: 0, total: 0 }],
};

export default function BillingForm({ editInvoiceId }) {
  const drawerRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  let invoiceIdToEdit = editInvoiceId || searchParams.get("edit");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // console.log("Form data", values);
      saveDataToLocalStorage(values, formik.values.status);
      setSubmitting(false);
      // closeDrawer();
      drawerRef.current.click();
      router.push("/home");
    },
  });

  useEffect(() => {
    if (invoiceIdToEdit) {
      const existingData =
        JSON.parse(
          typeof window !== "undefined" &&
            window.localStorage.getItem("billingFormData")
        ) || [];
      const invoiceToEdit = existingData.find(
        (invoice) => invoice.id == invoiceIdToEdit
      );
      if (invoiceToEdit) {
        formik.setValues(invoiceToEdit);
      }
    }
  }, [invoiceIdToEdit]);

  const saveDataToLocalStorage = (newData) => {
    try {
      const existingData =
        JSON.parse(
          typeof window !== "undefined" &&
            window.localStorage.getItem("billingFormData")
        ) || [];
      const index = existingData.findIndex(
        (invoice) => invoice.id == newData.id
      );

      if (index !== -1) {
        existingData[index] = newData;
      } else {
        existingData.push({ ...newData, id: parseInt(Math.random() * 1000) });
      }

      typeof window !== "undefined" &&
        window.localStorage.setItem(
          "billingFormData",
          JSON.stringify(existingData)
        );
      toast.success("Data successfully saved to local storage.");
    } catch (error) {
      toast.error("Error saving data to local storage:", error);
    }
  };

  const handleSaveAsDraft = () => {
    formik.setFieldValue("status", "Draft");
    formik.submitForm();
  };

  const handleSaveAndSend = () => {
    formik.setFieldValue("status", "Pending");
    formik.submitForm();
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6 py-4 ps-36">
        <h2 className="text-2xl font-bold">
          {editInvoiceId ? "Edit Invoice" : "Create Invoice"}
        </h2>
        <h2 className="text-base text-primary font-bold">Bill From</h2>
        {/* {JSON.stringify(formik.errors)} */}
        <Input
          name="streetAddress"
          label="Street Address"
          placeholder="Street Address"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.streetAddress && formik.errors.streetAddress}
        />
        {formik.touched.streetAddress && formik.errors.streetAddress && (
          <div className="text-red-500">{formik.errors.streetAddress}</div>
        )}
        <div className="grid grid-cols-3 gap-4">
          <Input
            name="city"
            label="City"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && formik.errors.city}
          />

          <div>
            <Input
              name="postCode"
              label="Post Code"
              placeholder="Post Code"
              value={formik.values.postCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.postCode && formik.errors.postCode}
            />
            {formik.touched.postCode && formik.errors.postCode && (
              <div className="text-red-500">{formik.errors.postCode}</div>
            )}
          </div>
          <Input
            name="country"
            label="Country"
            placeholder="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && formik.errors.country}
          />
        </div>
        <h2 className="text-base text-primary font-bold">Bill To</h2>
        <Input
          name="clientName"
          label="Client's Name"
          placeholder="Client's Name"
          value={formik.values.clientName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.clientName && formik.errors.clientName}
        />
        <Input
          name="clientEmail"
          label="Client's Email"
          placeholder="Client's Email"
          value={formik.values.clientEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.clientEmail && formik.errors.clientEmail}
        />
        <Input
          name="clientStreetAddress"
          label="Client's Street Address"
          placeholder="Client's Street Address"
          value={formik.values.clientStreetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.clientStreetAddress &&
            formik.errors.clientStreetAddress
          }
        />
        <div className="grid grid-cols-3 gap-4">
          <Input
            name="clientCity"
            label="Client City"
            placeholder="Client City"
            value={formik.values.clientCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.clientCity && formik.errors.clientCity}
          />
          <div>
            <Input
              name="clientPostCode"
              label="Client Post Code"
              placeholder="Client Post Code"
              value={formik.values.clientPostCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.clientPostCode && formik.errors.clientPostCode
              }
            />
            {formik.touched.clientPostCode && formik.errors.clientPostCode && (
              <div className="text-red-500">{formik.errors.clientPostCode}</div>
            )}
          </div>
          <Input
            name="clientCountry"
            label="Client Country"
            placeholder="Client Country"
            value={formik.values.clientCountry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.clientCountry && formik.errors.clientCountry}
          />
        </div>
        <h2 className="text-base text-primary font-bold">Invoice Details</h2>
        <div className="flex gap-5 ">
          <DatePicker
            name="invoiceDate"
            dateFormat="dddd, DDD, ddd, d, dd MMMM yyyy à HH'h'mm"
            value={formik.values.invoiceDate}
            onChange={(date) => formik.setFieldValue("invoiceDate", date)}
            onBlur={formik.handleBlur}
            error={formik.touched.invoiceDate && formik.errors.invoiceDate}
          />

          <div>
            <Select className="p-0 m-0">
              <SelectTrigger className="w-[180px] text-gray-500 dark:bg-transparent">
                <SelectValue placeholder="Payment Terms" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-destructive">
                <SelectGroup>
                  <SelectItem value=" Next 30 Days" className="border-b-2">
                    Next 30 Days
                  </SelectItem>
                  <SelectItem value=" Next 14 Days" className="border-b-2">
                    Next 14 Days
                  </SelectItem>
                  <SelectItem value=" Next 7 Days" className="border-b-2">
                    Next 7 Days
                  </SelectItem>
                  <SelectItem value=" Next 1 Days">Next 1 Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Textarea
          name="projectDescription"
          label="Project Description"
          placeholder="Project Description"
          value={formik.values.projectDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.projectDescription &&
            formik.errors.projectDescription
          }
        />
        <h2 className="text-base text-primary leading-none font-bold">
          Item List
        </h2>

        <FieldArray name="items">
          {({ push, remove }) => (
            <div>
              {formik.values.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 space-x-2 mb-4">
                  <div className="col-span-4">
                    <div className="pb-3 text-xs">
                      <Label htmlFor={`items.${index}.name`}>Item Name</Label>
                    </div>
                    <Input
                      id={`items.${index}.itemName`}
                      name={`items.${index}.itemName`}
                      type="text"
                      placeholder="Item Name"
                      onChange={formik.handleChange}
                      value={formik.values.items[index].itemName}
                    />
                    {formik.errors.items?.[index]?.itemName && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.items[index].itemName}
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <div className="pb-3 text-xs">
                      <Label htmlFor={`items.${index}.quantity`}>Qty.</Label>
                    </div>
                    <Input
                      id={`items.${index}.quantity`}
                      name={`items.${index}.quantity`}
                      type="text"
                      min="1"
                      placeholder="Quantity"
                      onChange={(e) => {
                        formik.setFieldValue(
                          `items.${index}.quantity`,
                          e.target.value
                        );
                        formik.setFieldValue(
                          `items.${index}.total`,
                          e.target.value * formik.values.items[index].price
                        );
                      }}
                      value={formik.values.items[index].quantity}
                    />
                    {formik.errors.items?.[index]?.quantity && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.items[index].quantity}
                      </div>
                    )}
                  </div>

                  <div className="col-span-3">
                    <div className="pb-3 text-xs">
                      <Label htmlFor={`items.${index}.price`}>Price</Label>
                    </div>
                    <Input
                      id={`items.${index}.price`}
                      name={`items.${index}.price`}
                      type="text"
                      min="0"
                      placeholder="Price"
                      onChange={(e) => {
                        formik.setFieldValue(
                          `items.${index}.price`,
                          e.target.value
                        );
                        formik.setFieldValue(
                          `items.${index}.total`,
                          e.target.value * formik.values.items[index].quantity
                        );
                      }}
                      value={formik.values.items[index].price}
                    />
                    {formik.errors.items?.[index]?.price && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.items[index].price}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <div className="pb-3 text-xs">
                      <Label>Total</Label>
                    </div>
                    <div className="flex items-center">
                      <Input
                        type="text"
                        readOnly
                        className="border-none"
                        placeholder="amount"
                        value={`$ ${formik.values.items[index].total}`}
                      />
                      <div className="justify-end items-center text-red-600">
                        <Trash2Icon
                          className="w-5 h-5"
                          onClick={() => remove(index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  push({ name: "", quantity: 1, price: 1, total: 0 })
                }
                className="bg-accent dark:bg-transparent dark:border dark:hover:bg-accent text-primary text-[12px] hover:bg-[#DFE3F9] mt-4 w-full rounded-full"
              >
                + Add New Item
              </Button>
            </div>
          )}
        </FieldArray>

        <div className="flex justify-between space-x-4 mt-6 bg-white dark:bg-[#141624] pt-7 w-full sticky bottom-0">
          <DrawerClose asChild>
            <button
              ref={drawerRef}
              type="button"
              className="py-2 px-4 bg-accent text-primary text-[13px] hover:bg-[#DFE3F9] rounded-full"
            >
              Discard
            </button>
          </DrawerClose>
          <div className="flex gap-5">
            <Button
              type="button"
              onClick={handleSaveAsDraft}
              className="rounded-full opacity-75 text-[13px] bg-btncolor hover:bg-btnhover text-[#888eaf] py-2 px-4"
            >
              Save as Draft
            </Button>

            <Button
              onClick={handleSaveAndSend}
              type="button"
              className="py-2 px-4 text-white bg-primary rounded-full text-[13px] "
            >
              Save & Send
            </Button>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}
