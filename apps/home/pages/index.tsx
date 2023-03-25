import { Badge, SimpleGrid } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import ProductCard from "product/lib/components/ProductCard";
import { useProducts, prefetchProducts } from "product/lib/data/product";

const Home = () => {
  const { products } = useProducts();

  return (
    <div>
      <Badge color="cyan" my="sm">
        Home app
      </Badge>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { cols: 3, maxWidth: "md" },
          { cols: 2, maxWidth: "sm" },
          { cols: 1, maxWidth: "xs" },
        ]}
      >
        {products.slice(0, 10)?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  await prefetchProducts(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
