"use client";

import { Prism } from "react-syntax-highlighter";
import { oneDark as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "../ui/button";
import { toast } from "sonner";

type CodeProps = {
  code: string;
  language?: string;
};

export const Code = ({ code, language = "typescript" }: CodeProps) => {
  const handleJSONCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success("Copied to the clipboard"))
      .catch(() => toast.error("Something went wrong while copying the result"));
  };

  return (
    <div>
      <div className="rounded-t-[10px] border-b bg-[#282c34] text-end border-muted-foreground">
        <Button
          size="sm"
          className="bg-transparent text-xs text-muted-foreground hover:bg-transparent hover:text-background"
          onClick={handleJSONCopy}
        >
          Copy Code
        </Button>
      </div>
      <Prism
        showLineNumbers
        lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
        wrapLines
        customStyle={{
          borderRadius: "0 0 10px 10px",
          margin: "0px",
          padding: "1em",
          width: "100%",
          boxSizing: "border-box",
          overflowX: "auto",
        }}
        codeTagProps={{ className: "font-sans" }}
        PreTag="div"
        language={language}
        style={theme}
      >
        {code}
      </Prism>
    </div>
  );
};
