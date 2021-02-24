const server = require("./src/app");
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
