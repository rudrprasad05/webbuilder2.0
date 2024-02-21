"use client";
import { Button } from "@/components/ui/button";
import { EditorElement, useEditor } from "@/provider/editor/editor-provider";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import Recursive from "./website-editor-components/recursive";
import { GetWebpageDetails } from "@/actions/websites";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { motion, useDragControls } from "framer-motion";

type Props = { funnelPageId: string; liveMode?: boolean };

const FunnelEditor = ({ funnelPageId, liveMode }: Props) => {
  const { dispatch, state } = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const controls = useDragControls();
  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  //CHALLENGE: make this more performant
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetWebpageDetails(funnelPageId);
      if (!response) return;

      console.log(response.content);

      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response.content ? JSON.parse(response?.content) : "",
          withLive: !!liveMode,
        },
      });
    };
    fetchData();
  }, [funnelPageId]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handleUnpreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW_MODE" });
    dispatch({ type: "TOGGLE_LIVE_MODE" });
  };

  function handleDragStart(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(event.active.id);
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    const activeId = active.id.toString();
    const overId = over?.id.toString();
    console.log(event.over?.id, activeId);

    if (active.id !== over?.id) {
      let temp: EditorElement[] = state.editor.elements[0].content.map(
        (i) => i
      );
      var activePos = temp
        .map(function (x) {
          return x.id;
        })
        .indexOf(activeId);
      var overPos = 0;
      if (overId != undefined)
        overPos = temp
          .map(function (x) {
            return x.id;
          })
          .indexOf(overId);

      const tempArr = arrayMove(temp, activePos, overPos);
      let tempState = state.editor.elements[0];
      tempState.content = tempArr;

      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: [tempState],
          withLive: !!liveMode,
        },
      });
      dispatch({
        type: "CHANGE_CLICKED_ELEMENT",
        payload: { elementDetails: tempArr[overPos] },
      });
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });
  const sensors = useSensors(mouseSensor);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
    >
      <div
        className={clsx(
          "use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all",
          {
            "pb-20": !state.editor.previewMode && !state.editor.liveMode,
            "!p-0 !mr-0":
              state.editor.previewMode === true ||
              state.editor.liveMode === true,
            "!w-[850px]": state.editor.device === "Tablet",
            "!w-[420px]": state.editor.device === "Mobile",
            "w-full": state.editor.device === "Desktop",
          }
        )}
        onClick={handleClick}
      >
        {state.editor.previewMode && state.editor.liveMode && (
          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
            onClick={handleUnpreview}
          >
            <EyeOff />
          </Button>
        )}
        <div
          className={cn(
            "h-full overflow-scroll bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]",
            {
              "p-0":
                state.editor.previewMode === true ||
                state.editor.liveMode === true,
            }
          )}
        >
          <div
            className={cn("p-6 w-full h-full bg-black/50", {
              "p-0": state.editor.liveMode || state.editor.previewMode,
            })}
          >
            <div className="h-full overflow-scroll bg-background">
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={state.editor.elements}
              >
                {Array.isArray(state.editor.elements) &&
                  state.editor.elements.map((childElement) => (
                    <Recursive key={childElement.id} element={childElement} />
                  ))}
              </SortableContext>
            </div>
            <DragOverlay>
              {activeId ? (
                <motion.div
                  className="-translate-y-[20px] h-8 w-full animate-pulse flex items-center justify-center bg-background border border-dashed border-primary"
                  drag="y"
                  dragControls={controls}
                ></motion.div>
              ) : null}
            </DragOverlay>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default FunnelEditor;
