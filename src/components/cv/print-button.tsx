"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ label }: { label: string }) {
  return (
    <Button onClick={() => window.print()} className="print:hidden">
      <Printer size={18} strokeWidth={1.75} aria-hidden="true" />
      {label}
    </Button>
  );
}
