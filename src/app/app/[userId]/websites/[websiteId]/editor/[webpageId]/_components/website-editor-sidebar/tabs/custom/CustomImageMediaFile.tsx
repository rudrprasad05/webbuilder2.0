"use client";

import { getMedia } from "@/actions/media";
import MediaUploadButton from "@/components/media/upload-buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/provider/editor/editor-provider";
import { GetMediaFiles } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CustomImageMediaFile = () => {
  const { state, dispatch, subaccountId } = useEditor();
  const [images, setImages] = useState<GetMediaFiles>(null);

  useEffect(() => {
    const handleImageFetch = async () => {
      const res = await getMedia(subaccountId).then((ress) => setImages(ress));
    };
    handleImageFetch();
  }, [images]);

  const handleOnChanges = (e: any) => {
    console.log(e);
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    console.log(styleObject);

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Label className="text-muted-foreground">Link</Label>
        <Input
          id="href"
          placeholder="https:domain.example.com/pathname"
          onChange={handleChangeCustomValues}
          value={state.editor.selectedElement.content.src}
        />
      </div>
      <div className="my-2">
        <Label className="text-muted-foreground">Media</Label>
        <Select
          onValueChange={(e) =>
            handleChangeCustomValues({
              target: {
                id: "src",
                value: e,
              },
            })
          }
          defaultValue={state.editor.selectedElement.content.src}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a file" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="p-2">
              {images?.media.map((img) => (
                <SelectItem
                  id={img.link}
                  className="px-0 py-0"
                  value={img.link}
                >
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      src={img.link}
                      alt="media file image"
                      height={50}
                      width={50}
                    />
                    <p>{img.name}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <MediaUploadButton dispatchTrue userId={subaccountId} />
      </div>
    </div>
  );
};

export default CustomImageMediaFile;
