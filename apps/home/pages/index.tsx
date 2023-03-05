import { Button } from "ui";

const Home = ({ users }) => {
  return (
    <div>
      <h1>Home</h1>
      <Button />
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
