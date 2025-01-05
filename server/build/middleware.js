"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrigin = checkOrigin;
function checkOrigin(req, res, next) {
    const route = req.url;
    console.log("Request received at: ", route);
    if (route !== "/questions") {
        const adminAuthToken = req.headers.adminauth;
        if (!adminAuthToken || adminAuthToken !== "colepalmer")
            res.send("You are not authorised to manage the quiz.");
    }
    console.log("Request authenticated.");
    next();
}
