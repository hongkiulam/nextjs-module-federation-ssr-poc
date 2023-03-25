import { QueryClient, useQuery } from "@tanstack/react-query";
import { DummyProduct } from "../types/product";

const getProducts = (): Promise<DummyProduct[]> =>
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => data.products);

const cacheKey = "products";
export const useProducts = () => {
  const { data: products } = useQuery({
    queryKey: [cacheKey],
    queryFn: getProducts,
  });
  return { products };
};

export const prefetchProducts = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery([cacheKey], getProducts);
};
