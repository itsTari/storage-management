"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType)=>{
  return  z.object({
  fullname: formType === 'sign-up'? z.string().min(2, { message: "Username must be at least 2 characters." }).max(50,{message:'Username must not be more than 50 characters'}) : z.string().optional(),
  email: z.string().email()
});
}


const Authform = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [accountId, setAccountId] = useState(null)

  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      fullname: "",
      email:''
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    setErrorMessage('')
    try {
      const user = await createAccount({fullName:values.fullname || '', email:values.email})
      setAccountId(user.accountId)
    } catch (error) {
      setErrorMessage('Failed to create an account please try again later')
    }finally{
      setLoading(false)
    }
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                  <div className="shad-form-item">
                      <FormLabel className="shad-form-label">Email</FormLabel>
                      <FormControl>
                          <Input placeholder="Enter your email address" className="shad-input" {...field} />
                      </FormControl>
                  </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-submit-button text-white" disabled={loading}>{type ==='sign-in'? 'Sign In' :'sign up'} {loading && (<img src='/assets/icons/loader.svg' alt="loader" width={24} height={24} className="ml-2 animate-spin"/>)}</Button>
            {errorMessage && (
              <p className="error-message">*{errorMessage}</p>
            )}
            <div className="body-2 flex justify-center"><p className="text-light-100">{type === 'sign-in'? "Don't have an account?":"Already have account?"}</p> <Link href={type === 'sign-in'? '/sign-up':'/sign-in'} className="ml-1 font-medium text-brand">{type === 'sign-in'? 'Sign Up':'Sign In'}</Link></div>
        </form>
      </Form>
      {/* otp verification */}
      {true && (<OTPModal email={form.getValues('email')} accountId={accountId}/> )}
      
    </>
  );
};

export default Authform;
