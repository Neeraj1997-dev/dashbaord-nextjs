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
import * as zod from "zod";
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
import Link from "next/link";

const FormSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        Cookies.set("token", result.token, { expires: 2 });
        window.location.href = "/dashboard";
      } else {
        const error = await response.json();
        alert(error.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Card className="w-full max-w-md sm:max-w-lg mx-auto p-4 sm:p-6 lg:p-8 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            Welcome to Tender.AI
          </CardTitle>
          <p className="text-sm text-gray-500">
            Your AI-powered tender assistant
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
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
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 disabled:bg-gray-400"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Or</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-500"
            >
              Register here
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            Developed by{" "}
            <a
              href="https://www.neerajkumar.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-500"
            >
              Neeraj Kumar
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
