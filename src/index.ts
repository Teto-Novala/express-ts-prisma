import express from "express";
import usersRouter from "./router/users.router";

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
