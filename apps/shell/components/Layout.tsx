import {
  Anchor,
  AppShell,
  Code,
  Flex,
  Header,
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
              Header from <Code>shell/_app</Code>
            </Text>
            <UnstyledButton onClick={() => toggleColorScheme()}>
              Toggle Colour Scheme
            </UnstyledButton>
            <Anchor href="/search">Browse</Anchor>
            <Anchor href="/cart">
              Cart {cart.length ? <>({cart.length})</> : null}
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
