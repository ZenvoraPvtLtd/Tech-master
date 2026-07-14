const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  
  // Write error to a file so the agent can read it
  try {
    const fs = require('fs');
    fs.appendFileSync('error_logs.txt', new Date().toISOString() + '\\n' + err.stack + '\\n\\n');
    if (req.body) {
      fs.appendFileSync('error_logs.txt', 'BODY: ' + JSON.stringify(req.body) + '\\n\\n');
    }
  } catch (e) {}

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      success: false,
      message: `Unexpected file field: ${err.field}`,
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
