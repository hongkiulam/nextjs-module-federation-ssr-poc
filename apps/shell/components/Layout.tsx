import {
  Anchor,
  AppShell,
  Badge,
  Flex,
  Header,
  Indicator,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { useCart } from "product/lib/state/cart";
const Layout = ({ children }) => {
  const { toggleColorScheme } = useMantineColorScheme();
  const { cart } = useCart();
  return (
    <AppShell
      header={
        <Header height={60}>
          <Flex align={"center"} h="100%" px={"24px"} justify="space-between">
            <Text>
              Header from <Badge color="dark">shell/_app</Badge>
            </Text>
            <UnstyledButton onClick={() => toggleColorScheme()}>
              Toggle Colour Scheme
            </UnstyledButton>
            <Anchor href="/search">Browse</Anchor>
            <Anchor href="/cart">
              <Indicator
                inline
                label={cart.length}
                disabled={!cart.length}
                color="grape"
                size={16}
              >
                Cart
              </Indicator>
            </Anchor>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
