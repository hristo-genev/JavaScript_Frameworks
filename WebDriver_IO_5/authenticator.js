const fs = require('fs');
const os = require('os')

exports.getToken = function(cloud) {
  console.log("Finding token for cloud " + cloud);
  try
  {
    let path = process.env.PERFECTO_TOKEN_STORAGE
    if (!path)
      path = (os.platform() == 'win32') ? process.env.USERPROFILE + "\\securityTokens.json" : process.env.HOME + "/securityTokens.json";

    let rawdata = fs.readFileSync(path);
    let jsonData = JSON.parse(rawdata);

    return jsonData.tokens[cloud];    
  }
  catch(err)
  {
    console.log(err)
    return "NOT FOUND!"
  }
};
