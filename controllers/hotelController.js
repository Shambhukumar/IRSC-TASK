const Hotel = require("./../models/hotelModel");

exports.createHotel = async (req, res, next) => {
  try {
    const newDoc = await Hotel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newDoc
      }
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      data: {
        error: "error"
      }
    });
  }
};

exports.getallHotel = async (req, res, next) => {
  const doc = await Hotel.find();
  res.status(200).json({
    status: "success",
    result: doc.length,
    data: {
      doc
    }
  });
};

exports.getHotelByCity = async (req, res, next) => {
  const hotelcity = req.params.city;

  const doc = await Hotel.find({ city: hotelcity });
  res.status(200).json({
    status: "success",
    result: doc.length,
    data: {
      doc
    }
  });
};

exports.getHotelByDate = async (req, res, next) => {
  const hoteldate = req.params.date;
  console.log(req.params);

  const doc = await Hotel.find({ date: { $lte: new Date(hoteldate) } }).sort({
    date: -1
  });
  res.status(200).json({
    status: "success",
    result: doc.length,
    data: {
      doc
    }
  });
};

exports.getHotelByDateAndCity = async (req, res, next) => {
  const hoteldate = req.params.date;
  const hotelcity = req.params.city;
  console.log(req.params);

  const doc = await Hotel.find({
    date: { $lte: new Date(hoteldate) },
    city: hotelcity
  }).sort({
    date: -1
  });
  res.status(200).json({
    status: "success",
    result: doc.length,
    data: {
      doc
    }
  });
};
