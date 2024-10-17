import { env } from "process";
import { server } from "./src";

const PORT = env.PORT;

server.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
