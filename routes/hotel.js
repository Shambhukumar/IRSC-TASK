var express = require("express");
var router = express.Router();
const Hotel = require("./../controllers/hotelController");

/* GET home page. */
router.post("/create", Hotel.createHotel);
router.get("/", Hotel.getallHotel);
router.get("/:city", Hotel.getHotelByCity);
router.get("/Date/:date", Hotel.getHotelByDate);
router.get("/Date/:date/city/:city", Hotel.getHotelByDateAndCity);

module.exports = router;
