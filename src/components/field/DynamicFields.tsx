"use client";

import { getFakerMethods } from "@/lib/mock";
import { Field } from "@/lib/type";
import { buildJSON, getBaseURL, handleInputTextNumber } from "@/lib/utils";
import { cloneDeep } from "lodash";
import { PlusCircle, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Code } from "./Code";
import { SelectMethod } from "./SelectMethod";
import { ViewCode } from "./ViewCode";
import { Template } from "./Template";
import { task } from "@/template/task";

export const DynamicFields = () => {
  const lists = getFakerMethods();

  const [result, setResult] = useState(null);
  const [count, setCount] = useState<string | null>(null);
  const [fields, setFields] = useState<Field[]>(task.fields);

  const handleChange = useCallback(
    (name: string, value: string, index: number, path: number[]) => {
      const newFields = cloneDeep(fields);
      let currentField = newFields;

      path.forEach((p) => (currentField = currentField[p].children!));
      const updatedField = Object.assign({}, currentField[index], { [name]: value });

      if (
        (name === "value" && currentField[index].value === "object" && value !== "object") ||
        (name === "value" && currentField[index].value === "arrayObject" && value !== "arrayObject")
      ) {
        updatedField.children = [];
      }

      currentField[index] = updatedField;
      setFields(newFields);
    },
    [fields, setFields],
  );

  const handleArrayValueChange = useCallback(
    (index: number, path: number[], value: string) => {
      const newFields = cloneDeep(fields);
      let currentField = newFields;

      path.forEach((p) => (currentField = currentField[p].children!));
      currentField[index] = { ...currentField[index], data: value };
      setFields(newFields);
    },
    [fields, setFields],
  );

  const handleFieldCountChange = useCallback(
    (index: number, path: number[], value: string) => {
      const newFields = cloneDeep(fields);
      let currentField = newFields;

      path.forEach((p) => (currentField = currentField[p].children!));
      currentField[index] = { ...currentField[index], count: handleInputTextNumber(value) };
      setFields(newFields);
    },
    [fields, setFields],
  );

  const addField = useCallback(
    (path: number[]) => {
      const newFields = cloneDeep(fields);
      let currentField = newFields;

      path.forEach((p) => (currentField = currentField[p].children!));
      currentField.push({ key: "", value: "" });
      setFields(newFields);
    },
    [fields, setFields],
  );

  const addNestedField = useCallback(
    (index: number, path: number[]) => {
      const newFields = cloneDeep(fields);
      let currentField = newFields;

      path.forEach((p) => (currentField = currentField[p].children!));
      currentField[index].children!.push({ key: "", value: "" });
      setFields(newFields);
    },
    [fields, setFields],
  );

  const removeField = useCallback(
    (index: number, path: number[]): void => {
      const newFields = cloneDeep(fields);
      let currentField = newFields;

      path.forEach((p) => (currentField = currentField[p].children!));
      currentField.splice(index, 1);
      setFields(newFields);
    },
    [fields, setFields],
  );

  const handleJSONSubmit = async () => {
    const response = await fetch("/api/mock", {
      method: "POST",
      body: JSON.stringify({
        data: buildJSON(fields),
        count: count ? parseInt(count) : 1,
      }),
    });

    setResult(await response.json());
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
          {field.value === "array" ? (
            <SelectMethod
              name="data"
              value={field.data || ""}
              index={index}
              path={path}
              handleArrayValueChange={handleArrayValueChange}
              lists={lists.filter((list) => list.category !== "")}
            />
          ) : null}
          {field.value === "arrayObject" || field.value === "array" ? (
            <Input
              type="text"
              placeholder="1-1000"
              value={field.count || ""}
              className="w-20"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => handleFieldCountChange(index, path, e.target.value)}
            />
          ) : null}
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
        {field.value === "object" || field.value === "arrayObject" ? (
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
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <h1 className="font-black">POST</h1>
          <div className="h-5 w-[1px] bg-border" />
          <h1 className="line-clamp-1 text-sm">{getBaseURL()}/api/mock</h1>
        </div>
        <Template setFields={setFields} />
      </div>
      <div className="flex flex-col gap-2">{renderFields(fields)}</div>
      <div className="flex items-center justify-between py-2">
        <Button onClick={() => addField([])} size="icon">
          <PlusCircle size={20} />
        </Button>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Count: 1-1000"
            value={count ?? ""}
            inputMode="numeric"
            className="w-20"
            pattern="[0-9]*"
            onChange={(e) => setCount(handleInputTextNumber(e.target.value))}
          />
          <ViewCode fields={fields} count={count} />
          <Button onClick={handleJSONSubmit} disabled={!fields.length}>
            Try it!
          </Button>
        </div>
      </div>
      {result ? <Code code={JSON.stringify(result, null, 2)} language="json" /> : null}
    </>
  );
};
