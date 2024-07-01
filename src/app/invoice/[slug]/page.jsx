"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IconLeft } from "react-day-picker";
import { toast } from "react-toastify";
import { DialogModel } from "../../../components/deletedModel/page";
import DrawerBar from "../../../components/drawerBar";

export default function Invoice({ params }) {
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (params.slug) {
      const existingData =
        JSON.parse(
          typeof window !== "undefined" &&
            window.localStorage.getItem("billingFormData")
        ) || [];
      const invoiceData = existingData.find(
        (invoice) => invoice.id == params.slug
      );
      setInvoice(invoiceData);
      setLoading(false);
    }
  }, [params.slug]);

  const handleDelete = () => {
    const existingData =
      JSON.parse(
        typeof window !== "undefined" &&
          window.localStorage.getItem("billingFormData")
      ) || [];
    const updatedData = existingData.filter((inv) => inv.id != params.slug);
    typeof window !== "undefined" &&
      window.localStorage.setItem(
        "billingFormData",
        JSON.stringify(updatedData)
      );
    router.push("/home");
    toast.success("Invoice deleted successfully.");
  };

  const handleMarkAsPaid = () => {
    const existingData =
      JSON.parse(
        typeof window !== "undefined" &&
          window.localStorage.getItem("billingFormData")
      ) || [];
    const updatedData = existingData.map((inv) =>
      inv.id == params.slug ? { ...inv, status: "Paid" } : inv
    );
    typeof window !== "undefined" &&
      window.localStorage.setItem(
        "billingFormData",
        JSON.stringify(updatedData)
      );
    toast.success("Invoice marked as paid.");
    router.push("/home");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!invoice) {
    return <p>Invoice not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-purple-500 dark:text-purple-300 font-bold"
        >
          <IconLeft className="w-3 h-3 text-primary" />
          <span className="text-purple-500 dark:text-purple-300 font-bold">
            Go back
          </span>
        </button>
      </div>
      <div
        id="invoiceNav"
        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center mb-8"
      >
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-300">Status</span>
          <div
            className={`flex items-center px-3 py-1 rounded-full ${
              invoice.status === "Pending"
                ? "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300"
                : invoice.status === "Draft"
                ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                : "bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                invoice.status === "Pending"
                  ? "bg-orange-700 dark:bg-orange-300"
                  : invoice.status === "Draft"
                  ? "bg-gray-700 dark:bg-gray-300"
                  : "bg-teal-700 dark:bg-teal-300"
              }`}
            ></div>
            <span>{invoice.status}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <DrawerBar editInvoiceId={invoice.id}>
            <button className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 py-2 px-4 rounded-full text-center hover:bg-purple-200 dark:hover:bg-purple-600">
              Edit
            </button>
          </DrawerBar>
          <DialogModel handleDelete={handleDelete} />
          {invoice.status !== "Paid" && (
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 py-2 px-4 rounded-full text-center hover:bg-green-200 dark:hover:bg-green-600"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mt-6">
          <div className="flex justify-between pb-8">
            <div>
              <p className="text-xl font-bold text-black dark:text-white">
                #{invoice.id}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">
                {invoice.streetAddress}
              </p>
              <p className="text-gray-500 dark:text-gray-300">{invoice.city}</p>
              <p className="text-gray-500 dark:text-gray-300">
                {invoice.postCode}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="space-y-4">
              <div className="text-gray-500 dark:text-gray-300">
                <p>Invoice Date</p>
                <p className="text-black dark:text-white font-semibold">
                  {new Date(invoice.invoiceDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-gray-500 dark:text-gray-300">
                <p>Payment Due</p>
                <p className="text-black dark:text-white font-semibold">
                  {invoice.paymentDueDate
                    ? new Date(invoice.paymentDueDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-gray-500 dark:text-gray-300">
                <p>Bill To</p>
                <p className="text-black dark:text-white font-bold">
                  {invoice.clientName}
                </p>
              </div>
              <div className="text-gray-500 dark:text-gray-300">
                <p>{invoice.clientStreetAddress}</p>
                <p>{invoice.clientCity}</p>
                <p>{invoice.clientPostCode}</p>
                <p>{invoice.clientCountry}</p>
              </div>
            </div>
            <div className="text-gray-500 dark:text-gray-300 space-y-4">
              <div>
                <p>Sent To</p>
                <p className="text-black dark:text-white font-semibold">
                  {invoice.clientEmail}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-4 text-gray-500 dark:text-gray-300">
                    Item Name
                  </th>
                  <th className="py-2 px-4 text-gray-500 dark:text-gray-300">
                    Qty.
                  </th>
                  <th className="py-2 px-4 text-gray-500 dark:text-gray-300">
                    Price
                  </th>
                  <th className="py-2 px-4 text-gray-500 dark:text-gray-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                      {item.itemName}
                    </td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                      ${item.price}
                    </td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                      ${item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center text-white dark:text-white py-4 px-4 bg-gray-800 rounded-lg mt-4">
            <p className="font-semibold">Amount Due</p>
            <span className="text-2xl font-bold">
              $
              {invoice.items
                .reduce((acc, item) => acc + item.total, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
