"use client";

import { CreateWebpage, CreateWebsite } from "@/actions/websites";
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
import { WebsiteWithPagesType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const NewWebpageForm = z.object({
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),

  pathName: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  previewImage: z.string().optional(),
  websiteId: z.string().optional(),
});

export type NewWebpageType = z.infer<typeof NewWebpageForm>;

const NewWebpage = ({ website }: { website: WebsiteWithPagesType }) => {
  const [open, setOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const session = useSession();
  const router = useRouter();

  const form = useForm<NewWebpageType>({
    resolver: zodResolver(NewWebpageForm),
    defaultValues: {
      name: "",
      previewImage: "",
      websiteId: "",
      pathName: "",
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
            `https://mctechfiji.s3.amazonaws.com/alibaba/${
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

  async function onSubmit(data: NewWebpageType) {
    data.previewImage = imageUrl;
    data.websiteId = website?.id;

    const res = await CreateWebpage(data)
      .then(() => {
        setOpen(false);
        toast("Webpage create", { description: "Start editing it!" });
        router.refresh();
        router.push("?c=true");
      })
      .catch((err) => {
        console.log(err);
        toast("An error occured", {
          description: "Try again in a few minutes",
        });
        setOpen(false);
        router.refresh();
      });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>New Webpage</DialogTitle>
          <DialogDescription>Create New Webpage</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Website Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter page name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pathName"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Path Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={`will be shown in URL`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 my-6 items-center">
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewWebpage;
