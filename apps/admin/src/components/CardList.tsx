import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { OrderType, ProductsType } from "@repo/types";
import { auth } from "@clerk/nextjs/server";

const CardList = async ({ title }: { title: string }) => {
  let products: ProductsType = [];
  let orders: OrderType[] = [];

  const { getToken } = await auth();
  const token = await getToken();

  if (title === "Latest Products") {
    products = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?limit=5`
    ).then((res) => res.json());
  } else {
    orders = await fetch(
      `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders?limit=5`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => res.json());
  }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="flex flex-col gap-2">
        {title === "Latest Products"
          ? products.map((item) => (
              <Card
                key={item.id}
                className="flex-row items-center justify-between gap-4 p-4 bg-background"
              >
                <div className="w-12 h-12 rounded-sm overflow-hidden relative">
                  <Image
                    src={Object.values(item.images as Record<string, string>)[0] || ""}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-0 flex-1">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-0">{item.price}€</CardFooter>
              </Card>
            ))
          : orders.map((item) => (
              <Card
                key={item._id}
                className="flex-row items-center justify-between gap-4 p-3 bg-background"
              >
                <div className="w-12 h-12 rounded-sm overflow-hidden relative">
                  <Image
                    src={"/transplaceholder.png"}
                    alt={item.email}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-0 flex-1">
                  <CardTitle className="text-sm font-medium">
                    {item.email}
                  </CardTitle>
                  <Badge variant={"secondary"} className="mt-1">
                    {item.status}
                  </Badge>
                </CardContent>
                <CardFooter className="p-0">{item.amount.toFixed(2)}€</CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CardList;
