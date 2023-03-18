import { Button, Code, Text } from "@mantine/core";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

const getUsers = () => {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
};
const Home = () => {
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: getUsers });

  return (
    <div>
      <Text>
        Home from <Code>home/index</Code>
      </Text>
      <Button>Boop</Button>
      <ul>
        {users?.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["users"], getUsers);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
