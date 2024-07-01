"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import Image from "next/image";
import empty from "../assets/img/emty.png";
import Link from "next/link";


export default function TableUi({data}) {
  return (
    <div>
      <div className="space-y-4 mb-10">
        {data.length ? (
          data.map((row) => (
            <div key={row.id}>
              <Link href={"/invoice/" + row.id}>
                <Table>
                  <TableBody>
                    <TableRow className="grid grid-cols-12 justify-center items-center">
                      <div className="col-span-5 col-start-2">
                        <TableCell>#{row.id}</TableCell>
                        <TableCell>{row.clientName}</TableCell>
                        {/* <TableCell>{row.invoiceDate}</TableCell> */}
                        <TableCell>
                          {new Date(row.invoiceDate).toLocaleDateString()}
                        </TableCell>
                      </div>
                      <div className="col-span-5 flex justify-end items-center">
                        <TableCell className="text-end">
                          $
                          {row.items.reduce((acc, item) => acc + item.total, 0)}
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                              row.status === "Pending"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-300"
                                : row.status === "Draft"
                                ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                : "bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-300"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                row.status === "Pending"
                                  ? "bg-orange-500"
                                  : row.status === "Draft"
                                  ? "bg-gray-500"
                                  : "bg-teal-500"
                              }`}
                            ></span>
                            {row.status}
                          </Badge>
                        </TableCell>
                        {/* <TableCell>
                          <Badge className={"flex gap-3"}>
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Paid
                          </Badge>
                        </TableCell> */}
                        <TableCell>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="size-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </TableCell>
                      </div>
                    </TableRow>
                  </TableBody>
                </Table>
              </Link>
            </div>
          ))
        ) : (
          <div className="mt-20 text-center">
            <Image
              src={empty}
              className="h-32 w-32 mx-auto"
              alt="no-invoices"
            />
            <div className="mt-5">
              <p className="text-lg font-semibold">There is nothing here</p>
              <p className="text-xs text-gray-400 mt-2">
                Create an invoice by clicking the New <br />
                Invoice button and get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
