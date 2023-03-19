import { Code, Text } from "@mantine/core";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const Home = () => {
  return (
    <div>
      <Text>
        Product from <Code>product/index</Code>
      </Text>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
