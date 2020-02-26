const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

//signUp Functionality
exports.signup = async (req, res, next) => {
  try {
    await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role
    });

    res.status(201).json({
      status: "success",
      data: {
        data: req.body
      }
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      data: {
        error
      }
    });
  }
};

//Login Functionality
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  });

  //remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1) Check if email and password exist
  if (!email || !password) {
    res.status(400).json({
      status: "error",
      data: {
        error: "Please provide Email and password"
      }
    });
  }
  //2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(user.password === password)) {
    res.status(401).json({
      status: "error",
      data: {
        error: "Please check your email or password"
      }
    });
  }
  //3) If everything ok, send token to client

  createSendToken(user, 201, req, res);
});

exports.getallUsers = async (req, res, next) => {
  const doc = await User.find();
  res.status(200).json({
    status: "success",
    result: doc.length,
    data: {
      doc
    }
  });
};

exports.isLoggedIn = async (req, res, next) => {
  //verifi if token is there
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //3) Check if user still exists
      console.log("if test");
      const currentUser = await User.findById(decoded.id);
      console.log("THE DEcoDED TEST", decoded);
      if (!currentUser) {
        console.log("User Not Exist");
        return next();
      }

      //There is loggen in user
      res.locals.user = currentUser;
      console.log("Working");
      return next();
    } catch (err) {
      console.log("Error");
      return next();
    }
  }
  next();
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: "success" });
};
