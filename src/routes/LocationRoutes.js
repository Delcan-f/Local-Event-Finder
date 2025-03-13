// const express = require("express");
// const router = express.Router();
// const {
//     createLocation,
//     getLocation,
//     updateLocation,
//     deleteLocation
// } = require("../controllers/LocationController");

// // Create a new location
// router.post("/", async (req, res, next) => {
//     try {
//         const newLocation = await createLocation(req, res);
//         res.status(201).json(newLocation);
//     } catch (error) {
//         next(error);
//     }
// });

// // Get a specific location by ID
// router.get("/:locationId", async (req, res, next) => {
//     try {
//         const location = await getLocation(req, res);
//         if (!location) {
//             return res.status(404).json({ message: "Location not found" });
//         }
//         res.status(200).json(location);
//     } catch (error) {
//         next(error);
//     }
// });

// // Update a location by ID
// router.patch("/:locationId", async (req, res, next) => {
//     try {
//         const updatedLocation = await updateLocation(req, res);
//         if (!updatedLocation) {
//             return res.status(404).json({ message: "Location not found" });
//         }
//         res.status(200).json(updatedLocation);
//     } catch (error) {
//         next(error);
//     }
// });

// // Delete a location by ID
// router.delete("/:locationId", async (req, res, next) => {
//     try {
//         const deletedLocation = await deleteLocation(req, res);
//         if (!deletedLocation) {
//             return res.status(404).json({ message: "Location not found" });
//         }
//         res.status(200).json({ message: "Location deleted successfully" });
//     } catch (error) {
//         next(error);
//     }
// });

// // Export the router
// module.exports = router;

const express = require("express");
const router = express.Router();
const {
    createLocation,
    getLocation,
    updateLocation,
    deleteLocation
} = require("../controllers/LocationController");

// Create a new location
router.post("/", createLocation);

// Get a specific location by ID
router.get("/:locationId", getLocation);

// Update a location by ID
router.patch("/:locationId", updateLocation);

// Delete a location by ID
router.delete("/:locationId", deleteLocation);

module.exports = router;