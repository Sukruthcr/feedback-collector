const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const feedback = JSON.parse(event.body);
  const filePath = path.resolve("/tmp/feedbacks.json");

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  data.push(feedback);
  fs.writeFileSync(filePath, JSON.stringify(data));

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};
