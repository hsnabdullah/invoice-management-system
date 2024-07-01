"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function DialogModel({ handleDelete }) {
  return (
    <Dialog className="!rounded-lg">
      <DialogTrigger asChild>
        <Button variant="delete">Delete</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white">
        <div className="grid p-4">
          <h2 className="text-2xl font-bold leading-normal tracking-tight">
            Confirm Deletion
          </h2>
          <p className="text-sm text-gray-500">
            Are you sure you want delete invoice This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="default">
              cancel
            </Button>
          </DialogClose>
          <Button onClick={handleDelete} type="submit" variant="delete">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
