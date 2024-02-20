"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import router from "next/router";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { SignUp } from "@/actions/user";

const RegisterFormSchema = z.object({
  email: z
    .string()
    .email("This is not a valid email.")
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  password: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  confirmPassword: z.string().optional(),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;

const RegisterForm = () => {
  return (
    <section className="p-20 h-full w-full flex items-center justify-center">
      <RegisterFormCont />
    </section>
  );
};

const RegisterFormCont = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
  const [showConfirmDialogue, setShowConfirmDialogue] = useState(false);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
    if (data.password != data.confirmPassword) {
      setPasswordsDontMatch(true);
      return;
    }
    setIsLoading(true);

    const res = await SignUp(data)
      .then(() => {
        toast("Registered Successfully", {
          description: "Confirm your email to continue",
        });
        setIsLoading(false);
        setShowConfirmDialogue(true);
        signIn("credentials", {
          ...data,
          redirect: false,
        });
      })
      .catch((err) => console.log(err));
  };

  if (showConfirmDialogue) {
    return (
      <Card className="w-[520px]">
        <CardHeader>
          <h1 className="text-2xl">Confirm your account</h1>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Login in to your email and click the link to confirm your email
            inorder to continue further. Dont see the link? Check your spam
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[520px]">
      <CardHeader>
        <h1 className="text-2xl">Sign Up</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        placeholder="enter password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (isPasswordVisible) setIsPasswordVisible(false);
                          else setIsPasswordVisible(true);
                        }}
                        className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                      >
                        {isPasswordVisible ? (
                          <EyeOff className=" w-5 h-5" />
                        ) : (
                          <Eye className=" w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        placeholder="retype password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (isPasswordVisible) setIsPasswordVisible(false);
                          else setIsPasswordVisible(true);
                        }}
                        className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                      >
                        {isPasswordVisible ? (
                          <EyeOff className=" w-5 h-5" />
                        ) : (
                          <Eye className=" w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm font-medium text-destructive">
              {passwordsDontMatch && "Passwords dont match"}
            </div>
            <Button className="flex gap-2" type="submit">
              {isLoading && <Loader2 className="animate-spin" />} Sign Up
            </Button>
            <div className="flex gap-1 text-xs">
              <p>Already have an account?</p>
              <Link className="text-primary" href={"/auth/login"}>
                Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
