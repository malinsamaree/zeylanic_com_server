require("../db/connection.js");
const User = require("../db/models/User.js");

const getCustomerObject = function (data, isSubDomain) {
  if (data.length === 0) {
    // sending 404 (not found) - customer not found
    return "404";
  } else {
    if (!data[0].contribution) {
      // sending 503 (service unavailable) - contribution failed
      return "503";
    } else {
      if (isSubDomain && !data[0].isSubDomainActive) {
        // sending 404 (not found) - subdomain inactive
        return "404";
      } else {
        return data[0]._id;
      }
    }
  }
};

const getUserId = function (req, res, next) {
  res.locals.userId = "homepage";

  const reqHostName = req.hostname.toLowerCase();

  //cheking if the requested hostname is correct
  const homePageHostName = process.env.HOMEPAGE_HOST_NAME;

  //check wheather the requested hostname is homepage
  if (
    reqHostName === homePageHostName ||
    reqHostName === `www.${homePageHostName}`
  ) {
    // sending homepage back
    res.locals.userId = "homepage";
    next();
  }
  //check wheather the requested hostname is a custom domain
  else if (!reqHostName.includes(homePageHostName)) {
    User.find({ customDomain: reqHostName }, (err, data) => {
      if (err) {
        // sending 500 (internal error)
        res.locals.userId = "500";
        next();
      } else {
        res.locals.userId = getCustomerObject(data, (subdomain = false));
        // console.log(res.locals.userId);
        next();
      }
    });
  }
  // else requested hostname is a subdomain
  else {
    const subDomain = reqHostName.split(homePageHostName)[0].slice(0, -1);
    User.find({ subDomain: subDomain }, (err, data) => {
      if (err) {
        // sending 500 (internal error)
        res.locals.userId = "500";
        next();
      } else {
        res.locals.userId = getCustomerObject(data, (subdomain = true));
        next();
      }
    });
  }
};

module.exports = getUserId;
