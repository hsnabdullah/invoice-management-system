"use client";

import React, { useEffect, useState } from "react";
import { data } from "../constants/payment";
import { columns } from "./columns";
import { ChevronDown } from "lucide-react";
import Cookies from "js-cookie";
import DrawerBar from "./drawerBar";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import TableUi from "./tableUi";
import Link from "next/link";
export function InvoiceTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [statusFilter, setStatusFilter] = useState("All");

  const [filteredData, setFilteredData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const filteredData =
  //   statusFilter === "ALL"
  //     ? data
  //     : data.filter((row) => row.status === statusFilter);
  useEffect(() => {
   
    if (statusFilter == "All") {
      setFilteredData(rawData);
    } else {
      let temp = rawData.filter((f) => f.status == statusFilter);
      setFilteredData(temp);
    }
  }, [statusFilter]);

  useEffect(() => {
    const existingData =
      JSON.parse(
        typeof window !== "undefined" &&
          window.localStorage.getItem("billingFormData")
      ) || [];
    setFilteredData(existingData);
    setRawData(existingData);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-12">
        <div>
          <Link href={"/home"}>
            <h1 className="text-3xl  font-bold">Invoices</h1>
          </Link>
          <p className="text-sm text-gray-500">
            There are {filteredData.length} total invoices
          </p>
        </div>

        <div className="flex gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                variant="outline"
                className="flex items-center outline-none"
              >
                {statusFilter} <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white cursor-pointer"
            >
              <DropdownMenuItem
                onClick={() => setStatusFilter("All")}
                className={statusFilter === "All" ? "font-bold" : ""}
              >
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter("Paid")}
                className={statusFilter === "Paid" ? "font-bold" : ""}
              >
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter("Pending")}
                className={statusFilter === "Pending" ? "font-bold" : ""}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter("Draft")}
                className={statusFilter === "Draft" ? "font-bold" : ""}
              >
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DrawerBar />
        </div>
      </div>
      <div>
        <TableUi data={filteredData} />
      </div>
    </div>
  );
}
