"use client";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  postCode: Yup.string()
    .matches(/^\d{5}$/, "Invalid post code")
    .required("required"),
  country: Yup.string().required("Country is required"),
  clientName: Yup.string().required("Client's Name is required"),
  clientEmail: Yup.string()
    .email("Invalid email format")
    .required("Client's Email is required"),
  clientStreetAddress: Yup.string().required(
    "Client's Street Address is required"
  ),
  clientCity: Yup.string().required("Client City is required"),
  clientPostCode: Yup.string()
    .matches(/^\d{5}$/, "Invalid post code")
    .required("Client Post Code is required"),
  clientCountry: Yup.string().required("Client Country is required"),
  invoiceDate: Yup.date().required("Invoice Date is required"),
  projectDescription: Yup.string().required("Project Description is required"),
  items: Yup.array()
    .of(
      Yup.object({
        itemName: Yup.string().required("Item Name is required"),
        quantity: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
        price: Yup.number()
          .min(0, "Price must be a positive number")
          .required("Price is required"),
        total: Yup.number().required("Total is required"),
      })
    )
    .min(1, "At least one item is required"),
});
