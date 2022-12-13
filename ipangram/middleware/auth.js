const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
   
    if (!token) {
        return give_response(res, 201, false, "Not authorize to  this route");
    }
    try {
        //varify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.uId = decoded._id;
        req.uRole = decoded.userRole;
        req.uEmail = decoded.email
        next();
    } catch (err) {
        console.log(err);
        return give_response(res, 201, false, "Not authorize to access this route");
    }
};
