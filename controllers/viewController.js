const Hotel = require("./../models/hotelModel");
exports.getoverview = async (req, res, next) => {
  const hotels = await Hotel.find();
  res.status(200).render("hotel", {
    title: "All Tours",
    hotels
  });
};
