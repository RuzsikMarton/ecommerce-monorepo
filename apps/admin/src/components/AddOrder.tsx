"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

const formSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Price must be at least 1!" }),
  userId: z.string().min(1, { message: "User ID is required!" }),
  status: z.enum(["pending", "success", "refund", "failed"]),
});

const AddOrder = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),});

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
      <SheetContent className="px-4">
        <SheetHeader className="px-0">
          <SheetTitle className="mb-4">Add Order</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name={"amount"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter the order price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"userId"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter the user ID.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"status"}
              render={() => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select the order status.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>       
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
  );
};

export default AddOrder;
