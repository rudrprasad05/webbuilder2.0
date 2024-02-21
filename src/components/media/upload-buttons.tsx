"use client";

import { createMedia } from "@/actions/media";
import { CreateWebsite } from "@/actions/websites";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEditor } from "@/provider/editor/editor-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const NewWebsiteForm = z.object({
  link: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
});

export type NewWebsiteType = z.infer<typeof NewWebsiteForm>;

const MediaUploadButton = ({
  userId,
  dispatchTrue,
}: {
  userId: string;
  dispatchTrue?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const { state, dispatch, subaccountId } = useEditor();

  const form = useForm<NewWebsiteType>({
    resolver: zodResolver(NewWebsiteForm),
    defaultValues: {
      link: "",
      name: "",
    },
  });

  const handleImageUpload = async (file: File) => {
    const salt = Date.now();
    setImageUpload(true);
    if (!file) return;

    try {
      let data = new FormData();
      data.append("file", file, "image" + salt.toString());

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          setImageUpload(false);
          setImageUrl(
            `https://mctechfiji.s3.amazonaws.com/wordpress/${
              "image" + salt.toString()
            }`
          );
          setIsImageInCloud(true);
          toast("Image Uploaded to Cloud");
        })
        .catch((e) => {
          toast("Something went wrong", { description: "Contact site admin" });
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  async function onSubmit(data: NewWebsiteType) {
    data.link = imageUrl;
    const res = await createMedia(userId, data)
      .then(() => {
        setOpen(false);
        toast("Media Uploaded", {
          description: "You can now add this to your site!",
        });
      })
      .catch((err) => {
        console.log(err);
        toast("An error occured", {
          description: "Try again in a few minutes",
        });
        setOpen(false);
      });

    if (dispatchTrue) {
      const styleObject = {
        src: data.link,
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
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>New Media</DialogTitle>
          <DialogDescription>Create New Media file</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>File name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="choose a name for your file"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="">
              <FormLabel>pgn, jpeg, jpg, webp, avif</FormLabel>
              <div className="flex gap-3 mt-2 items-center">
                <label
                  htmlFor="file"
                  className={cn(
                    "cursor-pointer",
                    imageUpload && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div
                    className={cn(
                      "items-center rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex gap-3",
                      isImageInCloud && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Upload />
                    <h2 className="text-sm">Upload Image</h2>
                  </div>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    disabled={isImageInCloud}
                    hidden
                    onChange={(e) => {
                      handleImageUpload(e.target.files?.[0] as File);
                    }}
                  />
                </label>

                {imageUpload && (
                  <div>
                    <Loader2 className="animate-spin" />
                  </div>
                )}

                {isImageInCloud && (
                  <div className="flex gap-2">
                    <div className="relative aspect-square h-[50px]">
                      <Image
                        className="rounded-md h-full object-cover"
                        src={imageUrl}
                        alt="image"
                        width={50}
                        height={50}
                      />
                      <button
                        onClick={() => setImageUrl("")}
                        className="p-[4px] absolute top-[-10px] right-[-10px] bg-rose-500 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadButton;
