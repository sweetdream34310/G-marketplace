const crypto = require('crypto');
const algorithm = 'aes-256-cbc';


function decryptAES(text, initializeVector, key) {
  console.log(initializeVector, "-----IV----")
  console.log(key, "-------KEY------")
  let buffIv = Buffer.from(initializeVector, 'base64');
  let buffKey = Buffer.from(key, 'base64');
  let buffText = Buffer.from(text, 'base64');
  // let decipher = crypto.createDecipheriv('aes-256-cbc', buffKey, buffIv).setAutoPadding(true);
  // let buffIv = Buffer.from(initializeVector, 'base64');
  // let asciiIv = buffIv.toString('ascii');
  // let buffKey = Buffer.from(key, 'base64');
  // let asciiKey = buffKey.toString('ascii');
  // console.log(asciiIv);
  // let buffText = Buffer.from(text, 'base64');
  // let asciiText = buffText.toString('ascii');
  // let decipher = crypto.createDecipheriv(algorithm, asciiKey, asciiIv);
  // let decrypted = decipher.update(text, 'base64', 'utf8');
  // console.log(decrypted.toString())
  // return (decrypted + decipher.final('utf8'));
  encrypted = Buffer.from(text, 'base64').toString('utf-8');
const decipher = crypto.createDecipheriv('aes-256-cbc', buffKey, buffIv);
var decrypted = decipher.update(encrypted, 'base64', 'utf-8');
decrypted += decipher.final('utf-8');
console.log(decrypted); // Hello World
}
module.exports = {

  decryptAES
}