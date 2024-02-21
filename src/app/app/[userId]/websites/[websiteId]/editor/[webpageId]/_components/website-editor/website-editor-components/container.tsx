"use client";
import { Badge } from "@/components/ui/badge";
import { EditorBtns, defaultStyles } from "@/lib/constants";
import { EditorElement, useEditor } from "@/provider/editor/editor-provider";
import clsx from "clsx";
import React, { useState } from "react";
import { v4 } from "uuid";
import Recursive from "./recursive";
import { Grab, GripVertical, Trash } from "lucide-react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, useDragControls } from "framer-motion";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import TextComponent from "./text";

type Props = { element: EditorElement };

const Container = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();
  const [holderStyles, setHolderStyles] = useState("");

  const getId = () => {
    return v4();
  };

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
              content: { innerText: "Text Element" },
              id: v4(),
              name: "Text",
              styles: {
                color: "white",
                ...defaultStyles,
              },
              type: "text",
            },
          },
        });
        break;
      case "link":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                innerText: "Link Element",
                href: "#",
              },
              id: v4(),
              name: "Link",
              styles: {
                color: "black",
                ...defaultStyles,
              },
              type: "link",
            },
          },
        });
        break;
      case "video":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "https://www.youtube.com/embed/A3l6YYkXzzg?si=zbcCeWcpq7Cwf8W1",
              },
              id: v4(),
              name: "Video",
              styles: {},
              type: "video",
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
      case "contactForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "contactForm",
            },
          },
        });
        break;
      case "paymentForm":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: "Contact Form",
              styles: {},
              type: "paymentForm",
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
              content: [
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%", flexGrow: 1 },
                  type: "container",
                },
                {
                  content: [],
                  id: v4(),
                  name: "Container",
                  styles: { ...defaultStyles, width: "100%", flexGrow: 1 },
                  type: "container",
                },
              ],
              id: v4(),
              name: "Two Columns",
              styles: { ...defaultStyles, display: "flex" },
              type: "2Col",
            },
          },
        });
        break;
      case "image":
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            containerId: id,
            elementDetails: {
              content: {
                src: "https://mctechfiji.s3.amazonaws.com/wordpress/image1708397861478",
              },
              id: v4(),
              name: "Image",
              styles: {},
              type: "image",
            },
          },
        });
        break;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // TODO

  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    if (type === "__body") return;
    // e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };
  const controls = useDragControls();

  return (
    <div
      key={id}
      style={styles}
      className={clsx("relative transition-all group ", {
        // "p-4": !state.editor.liveMode || !state.editor.previewMode,
        "mb-5 p-4": !state.editor.liveMode && type !== "__body",
        "max-w-full w-full": type === "container" || type === "2Col",
        "h-fit": type === "container",
        "h-full": type === "__body",
        "overflow-scroll ": type === "__body",
        "flex flex-col md:!flex-row": type === "2Col",
        "!border-blue-500 ":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== "__body",
        "!border-yellow-400 !border-4":
          state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type === "__body",
        "!border-solid":
          state.editor.selectedElement.id === id && !state.editor.liveMode,
        "border-dashed border-[1px] border-muted-foreground/60":
          !state.editor.liveMode,
      })}
      onDrop={(e) => {
        handleOnDrop(e, id);
      }}
      onDragOver={handleDragOver}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
      ref={setNodeRef}
    >
      {/* element name */}
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </Badge>

      {/* grab icon */}
      <Badge
        className={clsx(
          "absolute -top-[23px] left-[1px] rounded-none rounded-t-lg hidden",
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </Badge>

      {/* <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />

      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )} */}

      {/* content */}
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={state.editor.elements}
      >
        {Array.isArray(content) &&
          content.map((childElement) => (
            <Recursive key={childElement.id} element={childElement} />
          ))}
      </SortableContext>

      {/* Trash */}
      {state.editor.selectedElement.id === element.id &&
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

export default Container;
