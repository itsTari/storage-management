"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
});
type FormType = "sign-in" | "sign-up";

const Authform = ({ type }: { type: FormType }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullname: "" },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type == "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type == "sign-up" && (
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                    <div className="shad-form-item">
                        <FormLabel className="shad-form-label">FullName</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter your full name" className="shad-input" {...field} />
                        </FormControl>
                    </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* otp verification */}
    </>
  );
};

export default Authform;
