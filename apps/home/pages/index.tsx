import { Button, Code, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const Home = ({ users }) => {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      );
    },
  });

  const users2 = query.data;
  return (
    <div>
      <Text>
        Home from <Code>home/index</Code>
      </Text>
      <Button>Boop</Button>
      <ul>
        {users2?.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: { users },
  };
};
