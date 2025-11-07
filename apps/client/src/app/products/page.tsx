import ProductList from "@/components/ProductList";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string, search?: string, sort?: string}>;
}) => {
  const category = (await searchParams).category;
  const search = (await searchParams).search;
  const sort = (await searchParams).sort;

  return (
    <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
      <ProductList category={category} sort={sort} search={search} params="products"/>
    </div>
  );
};

export default ProductsPage;
