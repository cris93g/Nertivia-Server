const MainServerRouter = require("express").Router();

// Middleware
const authenticate = require("../../middlewares/authenticate");
const GDriveOauthClient = require("./../../middlewares/GDriveOauthClient");

// Policies
const UserPresentVerification = require ('./../../middlewares/UserPresentVerification')
const serverPolicy = require("../../policies/ServerPolicies");

// Create
MainServerRouter.route('/').post(
  authenticate,
  serverPolicy.createServer,
  require("./createServer")
);

// Update
MainServerRouter.route('/:server_id').patch(
  authenticate,
  serverPolicy.updateServer,
  GDriveOauthClient,
  UserPresentVerification,
  require("./updateServer")
);

// Delete
MainServerRouter.route('/:server_id').delete(
  authenticate,
  UserPresentVerification,
  require("./deleteLeaveServer")
);

// kick member
MainServerRouter.route('/:server_id/members/:unique_id').delete(
  authenticate,
  UserPresentVerification,
  require("./kickMember")
);

// banned members
http://192.168.1.8/api/servers/6583302963345756160/bans
MainServerRouter.route('/:server_id/bans').get(
  authenticate,
  UserPresentVerification,
  require("./bannedMembers")
)

// ban member
// http://192.168.1.8/api/servers/6583302963345756160/bans/184288888616859408
MainServerRouter.route('/:server_id/bans/:unique_id').put(
  authenticate,
  UserPresentVerification,
  require("./banMember")
)

// un ban member
// http://192.168.1.8/api/servers/6583302963345756160/bans/184288888616859408
MainServerRouter.route('/:server_id/bans/:unique_id').delete(
  authenticate,
  UserPresentVerification,
  require("./unBanMember")
)


// Channels
MainServerRouter.use('/', require('./channels'));

// Invites
MainServerRouter.use('/', require('./invites'));

// roles
MainServerRouter.use('/', require('./roles'));



module.exports = MainServerRouter;
