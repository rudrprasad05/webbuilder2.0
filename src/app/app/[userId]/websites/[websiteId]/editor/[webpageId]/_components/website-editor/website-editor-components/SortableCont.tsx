"use client";

import { cn } from "@/lib/utils";
import { useEditor } from "@/provider/editor/editor-provider";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import Recursive from "./recursive";
import SortableChildCont from "./SortableChildCont";

const SortableCont = ({
  someoneIsDragging,
}: {
  someoneIsDragging: boolean;
}) => {
  const { dispatch, state } = useEditor();
  return (
    <SortableContext
      strategy={verticalListSortingStrategy}
      items={state.editor.elements.map((i) => i)}
    >
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <SortableChildCont
            id={childElement.id}
            key={childElement.id}
            childElement={childElement}
            someoneIsDragging={someoneIsDragging}
          />
        ))}
    </SortableContext>
  );
};

export default SortableCont;
