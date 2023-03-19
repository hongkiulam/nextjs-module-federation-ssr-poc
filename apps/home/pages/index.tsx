import { Code, SimpleGrid, Text } from "@mantine/core";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import ProductCard from "../lib/components/ProductCard";
import { DummyProduct } from "../lib/types/product";

const getProducts = (): Promise<DummyProduct[]> =>
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => data.products);

const Home = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div>
      <Text>
        Home from <Code>home/index</Code>
      </Text>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { cols: 3, maxWidth: "md" },
          { cols: 2, maxWidth: "sm" },
          { cols: 1, maxWidth: "xs" },
        ]}
      >
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["products"], getProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
