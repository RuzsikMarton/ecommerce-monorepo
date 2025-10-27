"use client";
import { Watch, Glasses, ShoppingBasket, Briefcase } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

{
  /*Temporary data */
}
const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "Watches",
    icon: <Watch className="w-4 h-4" />,
    slug: "watches",
  },
  {
    name: "Glasses",
    icon: <Glasses className="w-4 h-4" />,
    slug: "glasses",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (category: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-gray-100 p-2 rounded-lg text-sm mb-4">
      {categories.map((category) => (
        <div
          key={category.slug}
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 ${
            category.slug === selectedCategory ? "bg-white" : "text-gray-500"
          }`}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
