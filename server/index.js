require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users-routes");
// const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use("/", usersRoutes);

// app.get("/users", (req, res, next) => {
//   return res(ctx.status(200), ctx.delay(500), ctx.json(users));
// }),
// app.get("/users/:uid", (req, res, ctx) => {
//   const { uid } = req.params;
//   const selectedUser = users.users.find((u) => u.id === uid);
//   return res(ctx.status(200), ctx.delay(500), ctx.json(selectedUser));
// }),
// app.put("/users/:uid", (req, res, ctx) => {
//   const { uid } = req.params;
//   console.log("uid", uid);
//   const selectedUser = users.users.find((u) => u.id === uid);
//   return res(ctx.status(200), ctx.delay(500), ctx.json(selectedUser));
// }),

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
app.listen(3001);