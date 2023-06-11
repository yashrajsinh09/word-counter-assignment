// not Found

const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error Handler

// const errorHandler = (err, req, res, next) => {
//   if (err.name == "ValidationError") {
//     return res.status(400).send({
//       status: false,
//       message: err.message,
//       stack: err?.stack,
//     });
//   }
//   if (err.code == 11000) {
//     return res.status(400).send({
//       status: false,
//       message: `Duplicate value provided at ${Object.keys(
//         err.keyValue
//       )}: ${Object.values(err.keyValue)}`,
//       stack: err?.stack,
//     });
//   }

//   const statuscode = err.status || res.statusCode;
//   res.status(statuscode);
//   res.json({
//     message: err?.message || "Something went wrong",
//     stack: err?.stack,
//   });
// };

module.exports = {
  notFound,
  //  errorHandler
};
