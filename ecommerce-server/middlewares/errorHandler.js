const notFound = (req, res, next) => {
  const err = new Error(`Not found : ${req.originalUrl}`);
  res.status(404);
  next(err);
};

// Handler
const errorHandler = (err, req, res, next) => {
  const status = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { notFound, errorHandler };
