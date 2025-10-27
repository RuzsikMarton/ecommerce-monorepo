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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

//temporary category schema
const categories = ["Watches", "Sunglasses", "Bags"] as const;

const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z
    .string()
    .min(1, "Short description is required!")
    .max(60, "Short description must be less than 60 characters!"),
  description: z.string().min(1, "Description is required!"),
  price: z.number().min(1, "Price is required!"),
  category: z.enum([...categories] as [string, ...string[]], {
    message: "Category is required!",
  }),
  sizes: z.array(z.enum(sizes)).optional(),
  colors: z.array(z.enum(colors)).min(1, "At least one color is required!"),
  images: z.record(z.enum(colors), z.string()),
});

const AddProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <SheetContent className="">
      <ScrollArea className="h-screen">
        <SheetHeader className="px-4">
          <SheetTitle className="mb-1">Add Product</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-4"
          >
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the name of the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"shortDescription"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the short description of the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} style={{ resize: "none" }} />
                  </FormControl>
                  <FormDescription>
                    Enter the description of the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"price"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the price of the product.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"category"}
              render={() => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select a category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"sizes"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4 my-2">
                      {sizes.map((size) => (
                        <div key={size} className="flex items-center gap-2">
                          <Checkbox
                            id="size"
                            checked={field.value?.includes(size)}
                            onCheckedChange={(ckecked) => {
                              const currentValues = field.value || [];
                              if (ckecked) {
                                field.onChange([...currentValues, size]);
                              } else {
                                field.onChange(
                                  currentValues.filter((s) => s !== size)
                                );
                              }
                              console.log(field.value);
                            }}
                          ></Checkbox>
                          <Label htmlFor={size} className="text-xs">
                            {size.toUpperCase()}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select the available sizes (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"colors"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 my-2">
                        {colors.map((color) => (
                          <div key={color} className="flex items-center gap-2">
                            <Checkbox
                              id="color"
                              checked={field.value?.includes(color)}
                              onCheckedChange={(ckecked) => {
                                const currentValues = field.value || [];
                                if (ckecked) {
                                  field.onChange([...currentValues, color]);
                                } else {
                                  field.onChange(
                                    currentValues.filter((s) => s !== color)
                                  );
                                }
                                console.log(field.value);
                              }}
                            ></Checkbox>
                            <Label htmlFor={color} className="text-xs">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                              ></div>
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {field.value && field.value.length > 0 && (
                        <div className="space-y-2 mt-8">
                          <p className="text-sm">Upload images for selected colors</p>
                          {field.value.map((color) => (
                            <div key={color} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{backgroundColor: color}}></div>
                                <span className="text-sm min-w-[60px]">{color}:</span>
                                <Input type="file" accept="image/*" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select the available colors.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
