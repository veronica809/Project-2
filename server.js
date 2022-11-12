const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cookieParser = require("cookie-parser");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./routes");
const { strict } = require("assert");

const app = express();
const port = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialize: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(cookieParser());
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("DB connection failed");
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
