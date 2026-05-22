const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute.cjs");
const expenseRouter = require("./routes/expenseRoute.cjs");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Support both frontend paths (/) and legacy paths (/users, /expense)
app.use("/", userRouter);
app.use("/users", userRouter);
app.use("/", expenseRouter);
app.use("/expense", expenseRouter);

module.exports = app;
