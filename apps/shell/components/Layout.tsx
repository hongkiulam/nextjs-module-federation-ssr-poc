import {
  AppShell,
  Badge,
  Flex,
  Header,
  Indicator,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
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
              <Link href="/">
                Header from <Badge color="dark">shell/_app</Badge>
              </Link>
            </Text>
            <UnstyledButton onClick={() => toggleColorScheme()}>
              Toggle Colour Scheme
            </UnstyledButton>
            <Link href="/search">Browse</Link>
            <Link href="/cart">
              <Indicator
                inline
                label={cart.length}
                disabled={!cart.length}
                color="grape"
                size={16}
              >
                Cart
              </Indicator>
            </Link>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
