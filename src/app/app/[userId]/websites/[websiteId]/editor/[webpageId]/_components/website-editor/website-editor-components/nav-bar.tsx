"use client";
import { EditorElement, useEditor } from "@/provider/editor/editor-provider";
import React from "react";
import RecursiveElement from "./recursive";

import { v4 } from "uuid";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { EditorBtns, defaultStyles } from "@/lib/constants";
import { GripVertical, Trash } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  element: EditorElement;
};

const Navbar = (props: Props) => {
  const { id, content, type } = props.element;
  const { dispatch, state } = useEditor();
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType") as EditorBtns;
    switch (componentType) {
      case "text":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: "Text Component" },
              id: v4(),
              name: "Text",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "text",
            },
          },
        });
        break;
      case "container":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Container",
              styles: { ...defaultStyles },
              type: "container",
            },
          },
        });
        break;
      case "2Col":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Two Columns",
              styles: { ...defaultStyles },
              type: "2Col",
            },
          },
        });
        break;

      case "navbar":
        console.log("first");
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [
                    {
                      id: v4(),
                      name: "Link",
                      styles: {
                        ...defaultStyles,
                        fontWeight: "bold",
                      },
                      type: "link",
                      content: {
                        innerText: "Navbar",
                        href: "#",
                      },
                    },
                  ],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles },
                  type: "container",
                },
                {
                  content: [
                    {
                      id: v4(),
                      name: "Link",
                      styles: {
                        ...defaultStyles,
                        marginLeft: "10px",
                        fontSize: "12px",
                      },
                      type: "link",
                      content: {
                        innerText: "Home",
                        href: "#",
                      },
                    },
                    {
                      id: v4(),
                      name: "Link",
                      styles: { ...defaultStyles, fontSize: "12px" },
                      type: "link",
                      content: {
                        innerText: "About",
                        href: "#",
                      },
                    },
                  ],
                  id: v4(),
                  name: "Container",
                  styles: {
                    ...defaultStyles,
                    display: "flex",
                    justifyContent: "end",
                  },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Navbar",
              styles: {
                ...defaultStyles,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#0c4a6e",
              },
              type: "navbar",
            },
          },
        });
        break;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    if (type === "__body") return;
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  return (
    <div
      style={props.element.styles}
      className={clsx("relative p-4 transition-all", {
        "mb-5": !state.editor.liveMode && type !== "__body",
        "h-fit": type === "container",
        "h-full": type === "__body",
        "m-4": type === "container",
        "!border-blue-500":
          state.editor.selectedElement.id === props.element.id &&
          !state.editor.liveMode,
        "!border-solid":
          state.editor.selectedElement.id === props.element.id &&
          !state.editor.liveMode,
        "border-dashed border-[1px] border-muted-foreground/60":
          !state.editor.liveMode,
      })}
      id="innerContainer"
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
      ref={setNodeRef}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      {Array.isArray(content) &&
        content.map((childElement) => (
          <RecursiveElement key={childElement.id} element={childElement} />
        ))}

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== "__body" && (
          <div className="flex gap-2 absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash size={16} onClick={handleDeleteElement} />
            {/* ref={setNodeRef}/ */}
            <div {...attributes} {...listeners}>
              <GripVertical size={16} />
            </div>
          </div>
        )}
    </div>
  );
};

export default Navbar;
