import {
  ActionIcon,
  Anchor,
  AppShell,
  Code,
  Flex,
  Header,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";

const Layout = ({ children }) => {
  const { toggleColorScheme } = useMantineColorScheme();
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
            <Anchor href="/cart">Cart</Anchor>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
