import { Fragment, useEffect, useState } from "react";
import { Button, Container, Divider, Group, Stack, Text } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";
// @ts-ignore
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { prefetchProducts, useProducts } from "../lib/data/product";
import { useCart } from "../lib/state/cart";
import { DummyProduct } from "../lib/types/product";
const Cart = () => {
  const [parent] = useAutoAnimate();
  const { cart, removeFromCart } = useCart();
  const { products } = useProducts();
  const [productsInCart, setProductsInCart] = useState<DummyProduct[]>([]);

  useEffect(() => {
    setProductsInCart(products?.filter((p) => cart.includes(p.id)));
  }, [cart, products]);
  return (
    <Container size="sm">
      <Stack ref={parent}>
        {productsInCart.map((product) => {
          return (
            <Fragment key={product.id}>
              <Group position="apart">
                <Text>{product.title}</Text>
                <Button
                  size="xs"
                  variant="outline"
                  color="grape"
                  onClick={() => {
                    removeFromCart(product.id);
                  }}
                >
                  Remove
                </Button>
              </Group>
              <Divider color="grape"></Divider>
            </Fragment>
          );
        })}
      </Stack>
    </Container>
  );
};
export default Cart;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await prefetchProducts(queryClient);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
