const { Router } = require("express");
const router = Router();
const { Admin, User } = require("../db/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_ADMIN } = require("../config");
const {Song} = require("../models/admin/song")
const multer = require("multer");
const fs = require('fs');
const path = require('path');


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
  const users = await User.find({});
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

//////////////////////////////////////////////////////////////////////////////////////////////////
// CRUD Operations on Song List
// Create a new song
// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where uploaded files will be stored
    cb(null, 'uploads/'); // You may need to create the 'uploads' folder in your project
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    cb(null, file.originalname);
  }
});

// Set up multer middleware
const upload = multer({ storage: storage });

router.post("/songs", authenticateAdmin, upload.single('songFile'), async (req, res) => {
  const { song, singer, musicDirector, releaseDate, albumName } = req.body;
  const songFile = req.file; // Access the uploaded file

  try {
    // Check if file is uploaded
    if (!songFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Create a new song with file details
    const newSong = await Song.create({
      song,
      singer,
      musicDirector,
      releaseDate,
      albumName,
      songFile: songFile.filename, 
      visible: true, 
    });

    await newSong.save();
    return res.status(201).json({ message: "Song added successfully", song: newSong });
  } catch (err) {
    console.error("Error creating song:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve all songs
router.get("/songs", authenticateAdmin, async (req, res) => {
  try {
    const songs = await Song.find({});
    return res.status(200).json({ songs });
  } catch (err) {
    console.error("Error retrieving songs:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update song details
router.put("/songs/:songId", authenticateAdmin, upload.single('songFile'), async (req, res) => {
  const { song, singer, musicDirector, releaseDate, albumName, visible } = req.body;
  const songId = req.params.songId;
  const songFile = req.file;

  try {
    let updateFields = {
      song,
      singer,
      musicDirector,
      releaseDate,
      albumName,
      visible
    };

    // If a new file is uploaded, update the file name
    if (songFile) {
      updateFields.songFile = songFile.filename;
    }

    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      updateFields,
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    return res.status(200).json({ message: "Song updated successfully", song: updatedSong });
  } catch (err) {
    console.error("Error updating song:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a song
// router.delete("/songs/:songId", authenticateAdmin, async (req, res) => {
//   const songId = req.params.songId;

//   try {
//     const deletedSong = await Song.findByIdAndDelete(songId);

//     if (!deletedSong) {
//       return res.status(404).json({ message: "Song not found" });
//     }

//     return res.status(200).json({ message: "Song deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting song:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

router.delete("/songs/:songId", authenticateAdmin, async (req, res) => {
  const songId = req.params.songId;

  try {
    // Find the song to delete
    const songToDelete = await Song.findById(songId);

    if (!songToDelete) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Delete the song file from the folder
    const filePath = path.join(__dirname, '../uploads/', songToDelete.songFile);
    fs.unlinkSync(filePath); // Remove the file synchronously

    // Delete the song from the database
    await Song.findByIdAndDelete(songId);

    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (err) {
    console.error("Error deleting song:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Restrict Visibility of Songs
router.put("/songs/:songId/visibility", authenticateAdmin, async (req, res) => {
  const { visible } = req.body;
  const songId = req.params.songId;

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { visible },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    return res.status(200).json({ message: "Song visibility updated successfully", song: updatedSong });
  } catch (err) {
    console.error("Error updating song visibility:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
