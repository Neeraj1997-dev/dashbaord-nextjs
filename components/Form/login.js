"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../FormUI/from";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card/card";

import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const staticLogin = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { email, password } = data;

      if (email === "neeraj@aisv.in" && password === "neeraj@123") {
        Cookies.set("token", "static-login-token", {
          expires: 7,
          secure: true,
        });
        alert("Login successful!");
        window.location.href = "/dashboard";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(staticLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message}</FormMessage>
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
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button className="w-full" variant="pinkBlue" type="submit" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => alert("Google Sign-In is disabled in this demo.")}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Register here
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          Developed by{" "}
          <a
            href="https://www.neerajkumar.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Neeraj Kumar
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;