// Add this component — use it inside each timer card

import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmbedCodeProps {
  timerId: number;
  status: "running" | "stopped";
}

const EmbedCode = ({ timerId, status }: EmbedCodeProps) => {
  const [copied, setCopied] = useState(false);
  const embedCode = `<script src="https://yourtimer.io/embed.js" data-timer-id="${timerId}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-3 pt-3 border-t border-slate-100">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <Code2 className="h-3 w-3" />
          Embed code
        </span>
        <Button
          variant="ghost"
          size="sm"
          disabled={status === "stopped"}
          onClick={handleCopy}
          className="h-6 px-2 text-xs text-slate-500 hover:text-slate-900"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" /> Copy
            </>
          )}
        </Button>
      </div>
      {status === "running" ? (
        <code className="block w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-600 font-mono break-all select-all leading-relaxed">
          {embedCode}
        </code>
      ) : (
        <div className="block w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs text-slate-600 font-mono break-all select-all leading-relaxed">
          Timer is stopped. Start the timer to enable embedding.
        </div>
      )}
    </div>
  );
};

export default EmbedCode;
