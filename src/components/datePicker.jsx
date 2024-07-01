"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { Select, SelectContent, SelectTrigger } from "./ui/select";

export default function DatePicker({ value, onChange, error }) {
  const [date, setDate] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
    onChange(selectedDate);
  };
  return (
    <div className="relative">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 h-screen w-screen bg-transparent z-[10]"
        ></div>
      )}
      <Button
        variant={"calendar"}
        onClick={() => setOpen(!open)}
        className={cn(
          "w-[180px] justify-start text-left font-normal rounded-md dark:bg-transparent text-gray-500",
          !date && "border border-muted"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
      {open && (
        <div className="bg-white dark:bg-destructive rounded-md p-2 border top-10 absolute z-[20]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className={" bg-white dark:bg-destructive"}
          />
        </div>
      )}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
