const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    if (isAlreadyFollowing.status === "accepted") {
      return res.status(400).json({
        message: `You are already following ${followeeUsername}`,
      });
    }

    if (isAlreadyFollowing.status === "pending") {
      return res.status(400).json({
        message: `Follow request already sent to ${followeeUsername}`,
      });
    }
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `Follow request sent to ${followeeUsername}`,
    follow: followRecord,
  });
}

async function getPendingFollowRequestsController(req, res) {
  const loggedInUsername = req.user.username;

  const pendingRequests = await followModel.find({
    followee: loggedInUsername,
    status: "pending",
  });

  if(pendingRequests.length === 0){
    res.status(404).json({
        message : "No requests exists."
    })
  }
  res.status(200).json({
    requests: pendingRequests,
  });
}

async function acceptFollowRequestController(req, res) {
  const requestId = req.params.id;

  const followRequest = await followModel.findById(requestId);

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  if (followRequest.followee !== req.user.username) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }

  followRequest.status = "accepted";

  await followRequest.save();

  res.status(200).json({
    message: `${followRequest.follower} is now following you`,
    follow: followRequest,
  });
}

async function rejectFollowRequestController(req, res) {
  const requestId = req.params.id;

  const followRequest = await followModel.findById(requestId);

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  // security check
  if (followRequest.followee !== req.user.username) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }

  await followModel.findByIdAndDelete(requestId);

  res.status(200).json({
    message: "Follow request rejected successfully",
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      message: "You cannot unfollow yourself",
    });
  }

  const isFolloweeExists = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }

  const followRecord = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!followRecord) {
    return res.status(404).json({
      message: `No follow relationship exists`,
    });
  }

  await followModel.findByIdAndDelete(followRecord._id);

  if (followRecord.status === "pending") {
    return res.status(200).json({
      message: `Follow request cancelled`,
    });
  }

  if (followRecord.status === "accepted") {
    return res.status(200).json({
      message: `You have unfollowed ${followeeUsername}`,
    });
  }
}

module.exports = {
  followUserController,
  getPendingFollowRequestsController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  unfollowUserController,
};
