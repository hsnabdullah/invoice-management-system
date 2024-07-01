"use client";

import React from "react";
import { PlusIcon } from "lucide-react";
import BillingForm from "./billingform";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
export default function DrawerBar({ children, editInvoiceId }) {
  
  return (
    <div className="z-0">
      <Drawer direction="left">
       { children ? <DrawerTrigger asChild>{children}</DrawerTrigger>:
        <DrawerTrigger asChild>
          <button className="flex gap-5 items-center bg-purple-600 text-white rounded-full px-3 py-2 shadow-lg">
            <PlusIcon className="text-black bg-white rounded-full w-8 h-8 p-2" />
            New Invoice
          </button>
        </DrawerTrigger>}
        <DrawerContent
          side="left"
          className="p-4 bg-white dark:bg-[#141624] shadow-md pe-10"
        >
          <ScrollArea className="h-full w-full">
            <div className="p-4">
              <BillingForm editInvoiceId={editInvoiceId} />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
