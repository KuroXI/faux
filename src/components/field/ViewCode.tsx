import { viewCode } from "@/lib/constant";
import { Field } from "@/lib/type";
import { buildJSON } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Code } from "./Code";

type ViewCodeProps = {
  fields: Field[];
  count: string | null;
};

export const ViewCode = ({ fields, count }: ViewCodeProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Eye size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Code Snippet</DialogTitle>
          <DialogDescription>
            This is the current code snippet from the fields
          </DialogDescription>
        </DialogHeader>
        <Code code={viewCode(buildJSON(fields), count)} isDialog />
        <div className="flex items-center justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
