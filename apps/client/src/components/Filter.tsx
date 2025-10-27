'use client';

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Filter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  return (
    <div className="flex justify-end my-6 items-center gap-2 text-sm text-gray-600">
        <span>Sort by:</span>
        <select className="ring-1 ring-gray-300 py-1 px-2 rounded-md shadow-sm" onChange={e => handleChange(e.target.value)} defaultValue={searchParams.get("sort") || "newest"}>
            <option value="newest">Newest Arrivals</option>
            <option value="oldest">Oldest</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
        </select>
    </div>
  )
}

export default Filter