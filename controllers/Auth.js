import Lab from '../models/Lab.js';

// Register
export const register = async (req, res) => {
  try {
    const {
      lab_name,
      email,
      password,
      university_name,
      field_of_study,
      lab_description,
    } = req.body;
    const newUser = new Lab({
      lab_name,
      email,
      password,
      university_name,
      field_of_study,
      lab_description,
      memebers: [],
      projects: [],
      publications: [],
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user from mongodb
    const lab = await Lab.findOne({ email });
    // If lab does not exist
    if (!lab) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    // If user exists, check password
    if (lab.password !== password) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }
    // If user exists and password is correct, return user
    res.status(200).json(lab);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
