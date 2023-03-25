import React from "react";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { DummyProduct } from "../types/product";
import { useCart } from "../state/cart";

const ProductCard: React.FC<{ product: DummyProduct }> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.includes(product.id);
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={product.thumbnail} height={160} alt={product.title} />
      </Card.Section>
      <Badge my={"sm"} color="grape">
        Product app (ProductCard)
      </Badge>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{product.title}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {product.description}
      </Text>

      <Button
        variant="light"
        color={isInCart ? "red" : "grape"}
        fullWidth
        mt="md"
        radius="md"
        onClick={() => {
          isInCart ? removeFromCart(product.id) : addToCart(product.id);
        }}
      >
        {isInCart ? "Remove" : "Add"} to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
