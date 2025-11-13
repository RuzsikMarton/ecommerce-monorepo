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
import { CategoryType, colors, ProductFormSchema, sizes } from "@repo/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

const fetchCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories!");
  }
  return await res.json();
};

const AddProduct = () => {
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      categorySlug: "",
      sizes: [],
      colors: [],
      images: {},
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data : z.infer<typeof ProductFormSchema>) => {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to create product");
      }
    },
    onSuccess: () => {
      toast.success("Product added successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    }
  })

  return (
    <SheetContent className="">
      <ScrollArea className="h-screen">
        <SheetHeader className="px-4">
          <SheetTitle className="mb-1">Add Product</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-4 px-4" onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
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
            {data && (
              <FormField
                control={form.control}
                name={"categorySlug"}
                render={() => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.categories.map((category: CategoryType) => (
                            <SelectItem key={category.id} value={category.slug}>
                              {category.name}
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
            )}
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
                    </div>
                  </FormControl>
                  <FormDescription>
                    Select the available colors.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name={"images"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <div className="">
                      {form.watch("colors").map((color) => (
                        <div
                          key={color}
                          className="mb-4 flex items-center gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 min-w-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-sm font-medium min-w-20">
                              {color}
                            </span>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const formData = new FormData();
                                    formData.append("file", file);
                                    formData.append(
                                      "upload_preset",
                                      "ecommerce"
                                    );
                                    const res = await fetch(
                                      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                                      {
                                        method: "POST",
                                        body: formData,
                                      }
                                    );
                                    const data = await res.json();

                                    if (data.secure_url) {
                                      const currentImage =
                                        form.getValues("images") || {};
                                      form.setValue("images", {
                                        ...currentImage,
                                        [color]: data.secure_url,
                                      });
                                    }

                                    if (!res.ok) {
                                      throw new Error(
                                        data.error.message || "Upload failed"
                                      );
                                    }
                                  } catch (err) {
                                    console.log(error);
                                    toast.error("Upload failed");
                                  }
                                }
                              }}
                            />
                            {field.value?.[color] ? (
                              <span className="text-green-600 text-xs">
                                Image selected
                              </span>
                            ) : (
                              <span className="text-red-600 text-xs">
                                No image
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <Button type="submit" disabled={mutation.isPending} className="disabled:cursor-not-allowed">{mutation.isPending ? "Submitting..." : "Submit"}</Button>
          </form>
        </Form>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
