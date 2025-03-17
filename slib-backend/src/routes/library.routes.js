import express from "express";
import Library from "../models/library.model.js";

const router = express.Router();

// 🟢 Get all libraries
router.get("/", async (req, res) => {
  try {
    const libraries = await Library.find();
    if (libraries.length === 0) {
      return res.status(404).json({ error: "No libraries found in the database." });
    }
    res.json(libraries);
  } catch (err) {
    console.error("❌ Error fetching libraries:", err);
    res.status(500).json({ error: "Internal Server Error: Unable to fetch libraries." });
  }
});

// Get a single library by ID
router.get("/:id", async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) return res.status(404).json({ error: "Library not found" });
    res.json(library);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🟢 Add new libraries (supports both single and bulk insertion)
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const libraries = Array.isArray(data) ? data : [data]; // ✅ Ensure it's always an array

    // ✅ Validate required fields for each library
    const missingFields = libraries.filter(lib => !lib.name || !lib.category || !lib.os || !lib.version);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: "⚠️ One or more libraries are missing required fields: name, category, os, version." });
    }

    // ✅ Convert `os` field to an array (if necessary)
    const formattedLibraries = libraries.map(lib => ({
      ...lib,
      os: Array.isArray(lib.os) ? lib.os : lib.os.split(",").map(os => os.trim()),
      dependencies: lib.dependencies ? (Array.isArray(lib.dependencies) ? lib.dependencies : lib.dependencies.split(",").map(dep => dep.trim())) : []
    }));

    // ✅ Insert into MongoDB
    const savedLibraries = await Library.insertMany(formattedLibraries);

    // ✅ Emit real-time event for new libraries
    req.app.get("socketio").emit("librariesAdded", savedLibraries);

    res.status(201).json({ message: `✅ Successfully added ${savedLibraries.length} libraries!`, libraries: savedLibraries });
  } catch (err) {
    console.error("❌ Error adding libraries:", err);
    res.status(500).json({ error: "Internal Server Error: Unable to add libraries." });
  }
});

export default router;
