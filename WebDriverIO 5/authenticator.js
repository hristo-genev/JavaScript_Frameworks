const fs = require('fs');

exports.getToken = function(cloud) {
  console.log("Finding token for cloud " + cloud);
  let rawdata = fs.readFileSync('C:\\Users\\hristo\\securityTokens.json');
  let jsonData = JSON.parse(rawdata);

  return jsonData.tokens[cloud];
};
