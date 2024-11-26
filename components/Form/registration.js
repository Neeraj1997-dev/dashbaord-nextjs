"use client";

import React from "react";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/Card/card";

import Cookies from "js.cookie";
import Link from "next/link";

const FormSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const RegistrationForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const registerUser = async (data) => {
    const { name, email, password } = data;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        Cookies.set('token', result.token, { expires: 7 }); 
       // alert(`Registration successful for ${name} with email ${email}`);
        window.location.href = "/dashboard"; 
      } else {
        alert(`Registration failed: ${result.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred while registering. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(registerUser)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                    <Input placeholder="Enter your email" {...field} />
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
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" variant="pinkBlue">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Sign In
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

export default RegistrationForm;
