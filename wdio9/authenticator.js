const fs = require('fs');
const os = require('os')

exports.getToken = function(cloud) {
  console.log("Finding token for cloud " + cloud);
  let path = process.env.PERFECTO_TOKEN_STORAGE
  if (!path)
    path = (os.platform() == 'win32') ? process.env.USERPROFILE + "\\securityTokens.json" : process.env.HOME + "/securityTokens.json";

  console.log('Using file ' + path)  
  let rawdata = fs.readFileSync(path);
  let jsonData = JSON.parse(rawdata);

  if (cloud.endsWith('.perfectomobile.com'))
    cloud = cloud.replace('.perfectomobile.com', '')

  let token = jsonData.tokens[cloud];
  if (token !== undefined)
    console.log("Token found!");
  
  return token;
};
