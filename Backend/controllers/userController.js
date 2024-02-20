import User from "../models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generatetoken";

const getUserProfile = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username }).select("-password").select("-updatedAt");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log("Error in getUserProfile: ", err.message);
	}
};

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in singup:", error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = bcrypt.compare(password, user?.password);

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password or username" });

    generateToken(user._id, res);

    res
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      });
  } catch (error) {
    res.status(500).json({ messsage: error.message });
    console.error("Error in loginUser: ", error.message);
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "you are logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUnfollowUser = async (req, res) => {
  const { id } = req.params;
  const userToModify = await User.findById(id);
  const currentUser = await User.findById(req.user._id);

  if (id === req.user._id.toString())
    return res.status(400).json({ message: "you cannot follow yourself" });

  if (!userToModify || !currentUser)
    return res.status(400).json({ message: "User does not exist" });

  const isFollowing = currentUser.following.includes(id);

  if (isFollowing) {
    //unfollow user
    await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
    await User.findByIdAndUpdate(id, { $pull: { following: req.user._id } });
  } else {
    //follow user
    await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
    await User.findByIdAndUpdate(id, { $push: { following: req.user._id } });
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, profilePic, bio } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ message: "You cannot update other user's profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};

export { loginUser, signupUser, logoutUser, followUnfollowUser, updateUser , getUserProfile };
