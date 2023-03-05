// import { Button } from "ui";

import dynamic from "next/dynamic";

// export default function Docs() {
//   return (
//     <div>
//       <h1>Docs</h1>
//       <Button />
//     </div>
//   );
// }
const Home = dynamic(import("home/pages/index"));
export default Home;
