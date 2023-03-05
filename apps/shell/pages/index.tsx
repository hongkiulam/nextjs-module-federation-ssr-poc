import dynamic from "next/dynamic";

const Home = dynamic(import("home/pages/index"));
export default Home;
