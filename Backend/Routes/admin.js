const { Router } = require("express");
const router = Router();
const { Admin, User } = require("../db/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_ADMIN } = require("../config");

const { authenticateAdmin } = require("../middlewares/authenticateAdmin");

//signin
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({
    username,
    password,
  });

  if (!admin) {
    return res.status(411).json({ message: "admin Doesn't Exist" });
  }

  const adminid = admin._id;

  try {
    const token = jwt.sign({ username, type: "Admin" }, JWT_SECRET_ADMIN, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({
        message: "admin login successfully",
        token: token,
        admin: adminid,
      });
  } catch {
    return res.status(411).json({ message: "Internal server error" });
  }
});

// signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const alreadyExist = await Admin.findOne({
    username,
  });

  if (alreadyExist) {
    return res.status(411).json({ message: "admin Already Exist" });
  }

  try {
    const admin = await Admin.create({
      username,
      password,
    });
    const adminid = admin._id;
    const token = jwt.sign({ username, type: "Admin" }, JWT_SECRET_ADMIN, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({
        message: "admin created successfully",
        token: token,
        admin: adminid,
      });
  } catch {
    return res.status(411).json({ message: "Internal server error" });
  }
});

//find all users
router.get("/users", authenticateAdmin, async (req, res) => {
  console.log("enter1")
  const users = await User.find({});
  console.log("enter1",users)
  return res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      _id: user._id,
    })),
  });
});

//find user byId
router.put("/users/:userId", authenticateAdmin, async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "Invalid UserId" });
  }

  return res.json({success:true, user})
});


router.get("", (req, res) => {
  res.json({ message: "entered routes" }, JWT_SECRET);
});

module.exports = router;
