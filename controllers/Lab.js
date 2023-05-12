import Lab from '../models/Lab.js';

// Update Lab
export const updateLab = async (req, res) => {
  try {
    const id = req.params.id;
    const { lab_name, lab_description } = req.body;
    const lab = await Lab.findById(id);
    lab.lab_name = lab_name;
    lab.lab_description = lab_description;

    const updatedLab = await lab.save();
    res.status(200).json(updatedLab);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get Lab
export const getLab = async (req, res) => {
  try {
    const id = req.params.id;
    const lab = await Lab.findById(id);
    res.status(200).json(lab);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get Labs
export const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json(labs);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Add Member
export const addMember = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, position } = req.body;
    const lab = await Lab.findById(id);
    const newMember = {
      name,
      position,
    };
    lab.members.push(newMember);
    const updatedLab = await lab.save();
    console.log(updatedLab);
    res.status(200).json(updatedLab.members[lab.members.length - 1]);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
