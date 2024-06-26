"use client";

import { Field, Method } from "@/lib/type";
import { PlusCircle, RotateCcw, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Code } from "./Code";
import { SelectMethod } from "./SelectMethod";
import { defaultFields } from "@/lib/constant";
import { toast } from "sonner";

export const DynamicFields = () => {
  const [result, setResult] = useState(null);
  const [lists, setLists] = useState<Method[]>([]);
  const [count, setCount] = useState("1");
  const [fields, setFields] = useState<Field[]>(defaultFields);

  useEffect(() => {
    const getMethods = async () => {
      const response = await fetch("/api/mock");
      setLists(await response.json());
    };

    return () => {
      getMethods();
    };
  }, []);

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let numericValue = e.target.value.replace(/[^0-9]/g, "");

    if (numericValue) {
      let num = parseInt(numericValue, 10);
      if (num < 1) {
        numericValue = "1";
      } else if (num > 1000) {
        numericValue = "1000";
      }
    }

    setCount(numericValue);
  };

  const handleChange = (name: string, value: string, index: number, path: number[]) => {
    const newFields = [...fields];
    let currentField = newFields;

    path.forEach((p) => (currentField = currentField[p].children!));
    const updatedField = { ...currentField[index], [name]: value };
    if (name === "value" && currentField[index].value === "object" && value !== "object") {
      updatedField.children = [];
    }

    currentField[index] = updatedField;
    setFields(newFields);
  };

  const addField = (path: number[]): void => {
    const newFields = [...fields];
    let currentField = newFields;

    path.forEach((p) => (currentField = currentField[p].children!));
    currentField.push({ key: "", value: "", children: [] });
    setFields(newFields);
  };

  const addNestedField = (index: number, path: number[]): void => {
    const newFields = [...fields];
    let currentField = newFields;

    path.forEach((p) => (currentField = currentField[p].children!));
    currentField[index].children!.push({ key: "", value: "", children: [] });
    setFields(newFields);
  };

  const removeField = (index: number, path: number[]): void => {
    const newFields = [...fields];
    let currentField = newFields;

    path.forEach((p) => (currentField = currentField[p].children!));
    currentField.splice(index, 1);
    setFields(newFields);
  };

  const handleJSONSubmit = async () => {
    const buildJSON = (fields: Field[]): Record<string, any> => {
      const result: Record<string, any> = {};

      fields.forEach((field) => {
        if (field.children && field.children.length > 0) {
          result[field.key] = buildJSON(field.children!);
        } else {
          result[field.key] = field.value;
        }
      });

      return result;
    };

    const response = await fetch("/api/mock", {
      method: "POST",
      body: JSON.stringify({ count: parseInt(count), data: buildJSON(fields) }),
    });

    setResult(await response.json());
  };

  const handleReset = () => {
    setResult(null);
    setFields([{ key: "", value: "", children: [] }]);
    toast.success("Fields has been reset!");
  };

  const renderFields = (fields: Field[], path: number[] = []) => {
    return fields.map((field, index) => (
      <div key={index} style={{ marginLeft: path.length ? 20 : 0 }} className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Key"
            name="key"
            value={field.key}
            onChange={(e) => handleChange(e.target.name, e.target.value, index, path)}
          />
          <SelectMethod
            name="value"
            value={field.value}
            index={index}
            path={path}
            handleChange={handleChange}
            lists={lists}
          />
          <div>
            <Button
              onClick={() => removeField(index, path)}
              size="icon"
              variant="outline"
              disabled={fields.length == 1}
            >
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
        {field.children?.length ? renderFields(field.children, [...path, index]) : null}
        {field.value === "object" ? (
          <div style={{ marginLeft: 20 }}>
            <Button onClick={() => addNestedField(index, path)} size="icon">
              <PlusCircle size={20} />
            </Button>
          </div>
        ) : null}
      </div>
    ));
  };

  return (
    <>
      <div className="flex flex-col gap-2">{renderFields(fields)}</div>
      <div className="flex items-center justify-between py-2">
        <Button onClick={() => addField([])} size="icon">
          <PlusCircle size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h1>Count:</h1>
            <Input
              type="text"
              placeholder="1-1000"
              value={count}
              className="w-20"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={handleCountChange}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 pb-5">
        <Button onClick={handleJSONSubmit} disabled={!fields.length || !count.length}>
          Try it!
        </Button>
        <Button onClick={handleReset} variant="destructive">
          <RotateCcw size={20} className="mr-2" />
          Reset
        </Button>
      </div>
      {result ? <Code code={JSON.stringify(result, null, 2)} language="json" /> : null}
    </>
  );
};
