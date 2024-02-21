"use client";

import { getMedia } from "@/actions/media";
import { GetWebsiteWithPages } from "@/actions/websites";
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
import { GetMediaFiles, WebsiteWithPagesType } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CustomLinkSettings = () => {
  const { state, dispatch, subaccountId, funnelId } = useEditor();
  const [images, setImages] = useState<WebsiteWithPagesType | null>(null);

  useEffect(() => {
    const handleImageFetch = async () => {
      const res = await GetWebsiteWithPages(funnelId).then((ress) =>
        setImages(ress)
      );
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

    console.log(styleObject);

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

  // console.log(state.editor.selectedElement.content);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground">Link Path</p>
        <Input
          id="href"
          placeholder="https://domain.example.com/pathname"
          onChange={handleChangeCustomValues}
          value={state.editor.selectedElement.content.href}
        />
      </div>
      <div className="my-2">
        <Label className="text-muted-foreground">Link to a page</Label>
        <Select
          onValueChange={(e) =>
            handleChangeCustomValues({
              target: {
                id: "href",
                value: e,
              },
            })
          }
          defaultValue={state.editor.selectedElement.content.href}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a file" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="p-2">
              {images?.webpages.map((webpage) => (
                <SelectItem
                  id={
                    webpage.pathName
                      ? process.env.LOCAL_URL ||
                        "http://localhost:3000" +
                          "/" +
                          images?.subDomainName +
                          "/" +
                          webpage.pathName
                      : "/"
                  }
                  className="px-0 py-0"
                  value={
                    webpage.pathName
                      ? process.env.LOCAL_URL ||
                        "http://localhost:3000" +
                          "/" +
                          images?.subDomainName +
                          "/" +
                          webpage.pathName
                      : "/"
                  }
                >
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      src={webpage.previewImage as string}
                      alt="media file image"
                      height={50}
                      width={50}
                    />
                    <p>{webpage.name}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CustomLinkSettings;
