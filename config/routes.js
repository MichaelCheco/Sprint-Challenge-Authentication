const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtKey = require("../_secrets/keys").jwtKey;
const db = require("../database/dbConfig");

const { authenticate } = require("./middlewares");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function generateToken(user) {
  const jwtPayload = {
    ...user
  };
  const jwtOptions = {
    expiresIn: "1h"
  };
  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

async function register(req, res) {
  // implement user registration
  try {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 12);
    creds.password = hash;
    const newUserId = await db("users").insert(creds);
    try {
      const newUser = await db("users")
        .where({ id: newUserId[0] })
        .first();
      const token = generateToken(newUser);
      return res.status(201).json({ token });
    } catch (err) {
      return res.status(404).json(err);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
