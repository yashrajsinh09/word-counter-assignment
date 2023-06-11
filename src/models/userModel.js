const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    // },
    // email: {
    //   type: String,
    // },
    // password: {
    //   type: String,
    // },

    name: {
      type: String,
    },
    wordCount: {
      type: Number,
    },
    favourite: {
      type: String,
      default: "false",
    },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = bcrypt.genSaltSync(10);
//   this.password = bcrypt.hashSync(this.password, salt);
//   next();
// });

// userSchema.methods.isPasswordMatched = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("xyz", userSchema);
