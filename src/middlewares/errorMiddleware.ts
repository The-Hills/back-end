const errorMiddleware = (err, req, res, next) => {
  if (err.status && err.code) {
    return res
      .status(err.status)
      .json({ message: err.message, code: err.code });
  }
  if (err.status) {
    return res
      .status(err.status)
      .json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

export default errorMiddleware;
