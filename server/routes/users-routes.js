const express = require("express");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/users", usersControllers.getUsers);
router.get("/users/:uid", usersControllers.getUser);
router.put("/users/:uid", usersControllers.updateUser);

module.exports = router;
