// const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
// // console.log(decodedToken);
//     req.user = decodedToken.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };

// module.exports = { authenticate };