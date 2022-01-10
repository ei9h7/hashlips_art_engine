const FormData = require('form-data');
const fetch = require('cross-fetch');
const path = require('path');
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require("fs");

fs.readdirSync(`${basePath}/build/images`).forEach(file => {
  const formData = new FormData();
  const fileStream = fs.createReadStream(`${basePath}/build/images/${file}`);
  formData.append('file', fileStream);

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      "Authorization": "2d7a94a7-3203-4d4b-a880-714b6f681d72",
    },
  };

  fetch("https://api.nftport.xyz/v0/files", options)
    .then((res) => res.json())
    .then((json) => {
      const fileName = path.parse(json.file_name).name;
      let rawdata = fs.readFileSync(`${basePath}/build/json/${fileName}.json`);
      let metaData = JSON.parse(rawdata);

      metaData.image = json.ipfs_url;

      fs.writeFileSync(`${basePath}/build/json/${fileName}.json`,
      JSON.stringify(metaData, null, 2));
      
      console.log(`${json.file_name} uploaded & ${fileName}.json updated!`);
    })
    .catch(err => console.error('error:' + err));

});

