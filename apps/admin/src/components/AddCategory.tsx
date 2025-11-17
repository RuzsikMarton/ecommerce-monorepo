"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { CategoryFormSchema } from "@repo/types";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AddCategory = () => {
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data : z.infer<typeof CategoryFormSchema>) => {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to add category");
      }
    },
    onSuccess: () => {
      toast.success("Category added successfully");
       form.reset();
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    }
  })
  return (
    <SheetContent className="px-4">
      <SheetHeader className="px-0">
        <SheetTitle className="mb-4">Add Category</SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => mutation.mutate(data))} className="space-y-4">
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter the category name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name={"slug"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Enter the slug for the category.
                </FormDescription>
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

export default AddCategory;
