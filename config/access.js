const ROLES = require(".././client/src/common/roles");

/** Access middleware to ensure user is allowed to access certain routes */
const AccessMiddleware = {
  hasAccess: (req, res, next) => {
    // console.log(req.user)
    // console.log(req.user.role);
    console.log("middleware above");
    if (!req.isAuthenticated()) {
      req.session.redirectTo = req.originalUrl;
      return res.status(401).json({ success: false, error: "unauthorized" });
    }

    next();
  },

  hasAdminAccess: (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== ROLES.ADMIN) {
      req.session.redirectTo = req.originalUrl;
      return res.status(401).json({ success: false, error: "unauthorized" });
    }

    next();
  },

  hasInstructorAccess: (req, res, next) => {
    console.log("instructor/admin middleware");
    console.log(req.user.role);
    const authorizedRoles = [ROLES.ADMIN, ROLES.INSTRUCTOR];
    if (!req.isAuthenticated() || !authorizedRoles.includes(req.user.role)) {
      req.session.redirectTo = req.originalUrl;
      return res.status(401).json({ success: false, error: "unauthorized" });
    }

    next();
  },
};

module.exports = AccessMiddleware;
