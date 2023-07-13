const users = require("../users.json");

const getUsers = async (req, res, next) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const selectedUser = users.users.find((u) => u.id === uid);
    res.status(200).json({
      selectedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    console.log("uid", uid);
    const selectedUser = users.users.find((u) => u.id === uid);
    res.status(200).json({
      selectedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
