const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, role, barCouncilId } = req.body;
 
  if (role === 'judge') {
    return res.status(403).json({ message: "You cannot register as a judge" });
  }

  if (role === 'advocate' && !barCouncilId) {
    return res.status(400).json({ message: "Bar Council ID is required for advocates" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    role,
    barCouncilId: role === 'advocate' ? barCouncilId : undefined
  });

  await newUser.save();
  res.status(201).json({ message: `${role} registered successfully` });
};

exports.login = async (req, res) => {
  const { username, password, role } = req.body;
  const user = await User.findOne({ username, role });

  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ userId: user._id, role: user.role }, 'secret');
  res.json({ message: `Welcome ${role}`, token });
};

