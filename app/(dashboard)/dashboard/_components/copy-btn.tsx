'use client'
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
const CopyBtn = ({ link }: { link: string }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(link);
        setIsCopied(true);
        toast({
            title: "Copied the link.",
            description: "The link is successfully copied.",
          })

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };
    return (
        <Button disabled={isCopied} onClick={copy} variant='outline'>
            {isCopied ? <Check className="W-3 h-3" /> : <Copy className="w-4 h-4 " />}
        </Button>
    )
}

export default CopyBtn