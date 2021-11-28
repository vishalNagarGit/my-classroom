

// helper funtion for authentication
module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({status:401, msg: 'You are not authorized to view this resource' });
    }
}
