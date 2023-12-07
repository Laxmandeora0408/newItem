const express = require("express");
const router = express.Router(); 
const filterController = require("../Controllers/fiters.js");

router.get("/search",filterController.searchDestination);
router.get("/mountains",filterController.mountains);
router.get("/trending",filterController.trending);
router.get("/rooms",filterController.rooms);
router.get("/iconicCities",filterController.iconicCities);
router.get("/castles",filterController.castles);
router.get("/amazingPools",filterController.amazingPools);
router.get("/camping",filterController.camping);
router.get("/farms",filterController.farms);
router.get("/artic",filterController.artic);






module.exports = router;