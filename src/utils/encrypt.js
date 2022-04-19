const bcrypt = require('bcrypt');



const encryptPassword = (pass) => {
    if (pass) {
      const hash = bcrypt.hashSync(pass, 10);
      return hash;
    }
  };
  
  const decryptPassword = (pass, hash) => {
    if (pass && hash) {
      return bcrypt.compareSync(pass, hash);
    } else {
      return false;
    }
  };

module.exports = {encryptPassword, decryptPassword};