export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const payload = {
    message: err.message || "Server Error",
  };

  
  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }

 
  if (err.response && err.response.status) {
    payload.upstreamStatus = err.response.status;
    payload.upstreamMessage = err.response.data?.message || "Upstream error";
    if (err.response.status === 429) {
      payload.message = "GitHub rate limit exceeded. Try again later.";
      return res.status(429).json(payload);
    }
  }

  res.status(status).json(payload);
};
