import { AppShell, Code, Flex, Header, Text } from "@mantine/core";

const Layout = ({ children }) => {
  return (
    <AppShell
      header={
        <Header height={60}>
          <Flex align={"center"} h="100%" px={"24px"}>
            <Text>
              Header from <Code>shell/_app</Code>
            </Text>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
