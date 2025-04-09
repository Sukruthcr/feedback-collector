const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  const filePath = path.resolve("/tmp/feedbacks.json");

  if (!fs.existsSync(filePath)) {
    return {
      statusCode: 200,
      body: JSON.stringify([]),
    };
  }

  const data = fs.readFileSync(filePath, "utf8");
  return {
    statusCode: 200,
    body: data,
  };
};
