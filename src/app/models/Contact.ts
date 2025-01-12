import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    maxlength: [60, 'Email cannot be more than 60 characters'],
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    maxlength: [100, 'Subject cannot be more than 100 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [1000, 'Message cannot be more than 1000 characters'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

