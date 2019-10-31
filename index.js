require("dotenv").config();
const server = require("./server");

const port = process.env.PORT || 4000;

// server.listen(4000, () => {
//   console.log("\n* Server Running on http://localhost:4000 *\n");
// });

server.listen(port, () => {
  console.log("listening on " + port);
});
