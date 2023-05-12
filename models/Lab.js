import mongoose from 'mongoose';

const labSchema = new mongoose.Schema(
  {
    lab_name: String,
    password: String,
    email: String,
    lab_description: String,
    university_name: String,
    field_of_study: String,
    members: [
      {
        user_id: String,
        name: String,
        email: String,
        position: String,
      },
    ],
    projects: [
      {
        name: String,
        description: String,
      },
    ],
    publications: [
      {
        name: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

const Lab = mongoose.model('labs', labSchema);

export default Lab;
