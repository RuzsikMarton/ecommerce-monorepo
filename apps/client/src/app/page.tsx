import ProductList from "@/components/ProductList";
import Slide from "@/components/Slide";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category || "";

  return (
    <main className="relative">
      <Slide />
      <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
        <ProductList category={category} params="homepage"/>
      </div>
    </main>
  );
};

export default Home;
