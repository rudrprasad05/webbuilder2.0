"use client";
import { cn } from "@/lib/utils";
import { useEditor } from "@/provider/editor/editor-provider";
import React from "react";
import Recursive from "./recursive";
import { useSortable } from "@dnd-kit/sortable";

const SortableChildCont = ({
  childElement,
  id,
  someoneIsDragging,
}: {
  childElement: any;
  id: string;
  someoneIsDragging: boolean;
}) => {
  const { dispatch, state } = useEditor();
  // const {
  //   attributes,
  //   isDragging,
  //   listeners,
  //   setNodeRef,
  //   transform,
  //   transition,
  // } = useSortable({ id });

  return (
    <div
      // ref={setNodeRef}
      // {...attributes}
      // {...listeners}
      // key={childElement.id}
      className="h-full"
      // onClick={() => {
      //   if (someoneIsDragging) {
      //     console.log("a card somewhere is being dragged still");
      //     return;
      //   }
      //   if (isDragging) {
      //     console.log("this card is being dragged still");
      //     return;
      //   }
      //   alert(
      //     "I should only appear when clicking items without dragging them, not on drag end"
      //   );
      // }}
    >
      <Recursive key={childElement.id} element={childElement} />
    </div>
  );
};

export default SortableChildCont;
