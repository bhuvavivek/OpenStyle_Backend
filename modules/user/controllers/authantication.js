const User = require("../models/user");
const { generateToken } = require("../../shared/services/authentication");

const handlecreateUser = async (req, res) => {
  try {
    const { fullName, emailAddress, phoneNumber, password, gender } = req.body;
    // Check if the email and phone number already exist

    const existingUser = await User.findOne({
      $or: [{ emailAddress }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const user = await User.create({
      fullName,
      emailAddress,
      phoneNumber,
      password,
      gender,
    });

    // i can prevent the password from being sent to the client by setting it to undefined there is two approch for this

    // the first one is : user.password = undefined;
    //   the second one is : userResponse = user.toObject(); than in next line delete userResponse.password; than pass  userResponse to the response

    const token = generateToken(user, "USER");

    let userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.salt;

    return res.status(201).json({
      message: "User created successfully",
      token,
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "error creating user " });
  }
};

const handleSignin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res
        .status(400)
        .json({ message: "Both phoneNumber and password are required" });
    }

    if (isNaN(phoneNumber)) {
      return res.status(400).json({ message: "phoneNumber must be number" });
    }

    if (phoneNumber.length !== 10) {
      return res.status(400).json({ message: "phoneNumber must be 10 digit" });
    }

    const token = await User.matchPasswordAndGenerateToken(
      phoneNumber,
      password
    );

    return res.json({ message: "Signin in SucessFully", token });
  } catch (error) {
    if (
      error.message === "user not found" ||
      error.message === "Incorrect Password"
    ) {
      return res.status(401).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Error logging in user", error: error.toString() });
  }
};

module.exports = {
  handlecreateUser,
  handleSignin,
};
