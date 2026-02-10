import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    required: true
  },
  favoriteColor: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  }
});

export default mongoose.model('Contact', contactSchema);
