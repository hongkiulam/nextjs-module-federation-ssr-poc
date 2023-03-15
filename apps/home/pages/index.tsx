import { Button, Code, Text } from "@mantine/core";

const Home = ({ users }) => {
  return (
    <div>
      <Text>
        Home from <Code>home/index</Code>
      </Text>
      <Button>Boop</Button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: { users },
  };
};
