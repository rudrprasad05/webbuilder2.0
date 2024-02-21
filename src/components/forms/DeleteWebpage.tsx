"use client";

import { DeleteWebpage, GetWebpageDetails } from "@/actions/websites";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WebpageOnly } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// TODO get super refine working. Need to endter the site name to delete
const NewWebsiteForm = z.object({
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  actualName: z.string().optional(),
});
//   .refine((data) => data.name === data.actualName, {
//     message: "Passwords don't match",
//     path: ["confirm"],
//   });

export type NewWebsiteType = z.infer<typeof NewWebsiteForm>;

const DeleteWebpageButton = () => {
  const params = useParams();
  const webpageId = params.webpageId;
  const [webpageData, setWebpageData] = useState<WebpageOnly | null>(null);

  const form = useForm<NewWebsiteType>({
    resolver: zodResolver(NewWebsiteForm),
    defaultValues: {
      actualName: webpageData?.name,
    },
  });

  async function onSubmit(data: NewWebsiteType) {
    const res = await DeleteWebpage(webpageId as string)
      .then(() => {
        toast("Website Deleted", { description: "Redirecting" });
      })
      .catch((err) => {
        console.log(err);
        toast("An error occured", {
          description: "Try again in a few minutes",
        });
      });
  }

  useEffect(() => {
    console.log("first");
    const handleGet = async () => {
      const res = await GetWebpageDetails(webpageId as string).then((res) =>
        setWebpageData(res)
      );
    };

    handleGet();
  }, []);

  const handleDelete = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete Site</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Site</DialogTitle>
          <DialogDescription>This action cannot be reversed</DialogDescription>
        </DialogHeader>
        <DialogDescription>
          To continue write the name of your site:{" "}
          <strong>{webpageData?.name}</strong>
        </DialogDescription>

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
                  <FormLabel>Website Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter website name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>{form.formState.errors.confirm?.message}</div>

            <FormField
              control={form.control}
              defaultValue={webpageData?.name}
              name="actualName"
              render={({ field }) => (
                <FormItem className="grow" hidden>
                  <FormLabel>Website Name</FormLabel>
                  <FormControl>
                    <Input
                      hidden
                      autoComplete="off"
                      placeholder="enter website name"
                      {...field}
                      value={webpageData?.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Delete</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWebpageButton;
