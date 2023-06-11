const express = require("express");
const {
  // userSignUp,
  // loginUser,
  // logoutUser,
  getUrlInsights,
  getUrls,
  deleteUrl,
  updateFavouriteStatus,
} = require("../controller/userController");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

// router.post("/signup", userSignUp);
// router.post("/login", loginUser);
// router.get("/logout", logoutUser);
router.post("/insights", getUrlInsights);
router.get("/urls", getUrls);
router.delete("/delete/:id", deleteUrl);
router.put("/favorite/:id", updateFavouriteStatus);
router.put("/unfavorite/:id", updateFavouriteStatus);

module.exports = router;
