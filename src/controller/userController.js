const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const axios = require("axios");
const cheerio = require("cheerio");

// // SignUp User
// const userSignUp = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const findUser = await User.findOne({ email });
//     if (!findUser) {
//       const newUser = await User.create({ username, email, password });
//       return res.status(201).json(newUser);
//     } else {
//       return res
//         .status(400)
//         .json({ status: false, message: "User Already Exists" });
//     }
//   } catch (error) {
//     return res.status(500).json({ status: false, error: error.message });
//   }
// };

// // Login a User
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // check if user exits or not
//     const findUser = await User.findOne({ email });
//     if (findUser && (await findUser.isPasswordMatched(password))) {
//       const refreshToken = await generateRefreshToken(findUser?._id);
//       const updateUser = await User.findByIdAndUpdate(
//         findUser.id,
//         { refreshToken },
//         { new: true }
//       );
//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: 72 * 60 * 60 * 1000,
//       });
//       res.status(200).json({
//         _id: findUser?._id,
//         username: findUser?.username,
//         email: findUser?.email,
//         token: generateToken(findUser?._id),
//       });
//       console.log(findUser?._id);
//     } else {
//       return res
//         .status(401)
//         .json({ status: false, message: "Invalid Credentials" });
//     }
//   } catch (error) {
//     return res.status(500).json({ status: false, error: error.message });
//   }
// };

// //Logout a user
// const logoutUser = async (req, res) => {
//   try {
//     const cookie = req.cookies;
//     if (!cookie?.refreshToken) throw new Error("No refresh Token in Cookies");
//     const refreshToken = cookie.refreshToken;
//     const user = await User.findOne({ refreshToken });
//     if (!user) {
//       res.clearCookie("refreshToken", {
//         httpOnly: true,
//         secure: true,
//       });
//       return res.sendStatus(204);
//     }
//     await User.findOneAndUpdate(refreshToken, {
//       refreshToken: "",
//     });
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: true,
//     });
//     return res.sendStatus(204);
//   } catch (error) {
//     return res.status(500).json({ status: false, error: error.message });
//   }
// };

const getUrlInsights = async (req, res) => {
  const {url} = req.body;
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    return res.json({
      massage: "please enter a correct URL, e.g., https://example.com",
    });
  }
  const html = response.data;
  const $ = cheerio.load(html);
  const text = $("body").text();
  const wordCount = text.trim().split(/\s+/).length;

  try {
    const result = await User.create({
      name: new URL(url).hostname,
      wordCount,
    });

    res.status(201).json({ status: true, data: result });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const getUrls = async (req, res) => {
  const data = await User.find();
  return res.status(200).json(data);
};

const deleteUrl = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ status: true, massage: "removed", data: result });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const updateFavouriteStatus = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    result.favourite = true;
    await result.save();
    res.status(200).json({ status: true, massage: "update", data: result });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const updateUnfavouriteStatus = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    result.favourite = false;
    await result.save();
    res.status(200).json({ status: true, massage: "update", data: result });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = {
  // userSignUp,
  // loginUser,
  // logoutUser,
  getUrlInsights,
  getUrls,
  deleteUrl,
  updateFavouriteStatus,
  updateUnfavouriteStatus
};
