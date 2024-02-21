import DeleteWebpageButton from "@/components/forms/DeleteWebpage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import React from "react";

export default function AdminTab() {
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Typography", "Dimensions", "Decorations", "Flexbox"]}
    >
      <AccordionItem value="Custom" className="px-6 py-0  ">
        <AccordionTrigger className="!no-underline">Site</AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-rose-500">Danger Zone</h2>
            <DeleteWebpageButton />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
