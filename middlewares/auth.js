 const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    try {
        const userUid = req.cookies?.uid;

        if (!userUid) {
            return res.redirect("/login");
        }

        const user = getUser(userUid);

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function checkAuth(req, res, next) {
    try {
        const userUid = req.cookies?.uid;

        if (!userUid) {
            req.user = null;
            return next();
        }

        const user = getUser(userUid);

        req.user = user || null;

        next();
    } catch (error) {
        console.error("Authentication Error:", error);
        req.user = null;
        next();
    }
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};