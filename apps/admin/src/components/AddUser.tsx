"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UserFormSchema } from "@repo/types";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-toastify";

const AddUser = () => {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: [],
      password: "",
      confirmPassword: "",
    },
  });

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
      const token = await getToken();
      const {confirmPassword, ...payload} = data;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to add user");
      }
    },
    onSuccess: () => {
      toast.success("User added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  return (
    <SheetContent className="px-4">
      <SheetHeader className="px-0">
        <SheetTitle className="mb-4">Add User</SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name={"firstName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"lastName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"username"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"emailAddress"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Addresses</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="email1@gmail.com, email2@gmail.com"
                    onChange={(e) => {
                      const emails = e.target.value
                        .split(",")
                        .map((email) => email.trim())
                        .filter((email) => email.length > 0);
                      field.onChange(emails);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"confirmPassword"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button type="submit" disabled={mutation.isPending} className="disabled:cursor-not-allowed">{mutation.isPending ? "Submitting..." : "Submit"}</Button>
        </form>
      </Form>
    </SheetContent>
  );
};

export default AddUser;
