import React from "react";
import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { DummyProduct } from "../types/product";

const ProductCard: React.FC<{ product: DummyProduct }> = ({ product }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={product.thumbnail} height={160} alt={product.title} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{product.title}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {product.description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
