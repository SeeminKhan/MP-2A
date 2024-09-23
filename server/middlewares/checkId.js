const { isValidObjectId } = require("mongoose");

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: `Invalid Object ID: ${req.params.id}` });
  }
  next();
}

module.exports = checkId;
