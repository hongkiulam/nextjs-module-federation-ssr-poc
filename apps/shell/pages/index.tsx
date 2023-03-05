import dynamic from "next/dynamic";

export default dynamic(import("home/pages/index"));

export const getServerSideProps = async (...ctx) =>
  import("home/pages/index").then((mod) => mod.getServerSideProps(...ctx));
