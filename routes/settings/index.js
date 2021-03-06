const MainSettingsRouter = require("express").Router();
const busboy = require("connect-busboy");

// Middleware
const authenticate = require("../../middlewares/authenticate");
const GDriveOauthClient = require("./../../middlewares/GDriveOauthClient");

// Policies
const settingsPolicy = require("../../policies/settingsPolicies");

// Change Status
MainSettingsRouter.route("/status").post(
  authenticate,
  settingsPolicy.status,
  require("./changeStatus")
);

// Change appearance
MainSettingsRouter.route("/apperance").put(
  //TODO: fix typo in database and client and server.
  authenticate,
  require("./changeAppearance")
);

// Emoji
MainSettingsRouter.route("/emoji")
  .post(authenticate, GDriveOauthClient, busboy(), require("./addCustomEmoji"))
  .put(authenticate, require("./renameCustomEmoji"))
  .delete(authenticate, require("./deleteCustomEmoji"));

// Server Position
MainSettingsRouter.route("/server_position")
  .put(authenticate, require("./serverPosition"))

// Link Google Drive
MainSettingsRouter.use(
  "/drive",
  GDriveOauthClient,
  require("./linkGoogleDrive")
);


module.exports = MainSettingsRouter;
