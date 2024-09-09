import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { Check, ContentCopy } from "@mui/icons-material";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Stack direction="row" sx={{ background: "#F5F5F5", borderRadius: 1 }}>
      <pre
        style={{
          overflow: "auto",
          maxWidth: "100%",
          padding: 16,
          margin: 0,
          flexGrow: 1,
        }}
      >
        <code>{code}</code>
      </pre>
      <Button
        onClick={handleCopy}
        color="secondary"
        sx={{ padding: 0, height: "fit-content", minWidth: "fit-content" }}
      >
        {copied ? (
          <Check sx={{ margin: 1, fill: "#636c76" }} />
        ) : (
          <ContentCopy sx={{ margin: 1, fill: "#636c76" }} />
        )}
      </Button>
    </Stack>
  );
}
