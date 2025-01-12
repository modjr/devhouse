import mongoose, { Schema, Document } from 'mongoose';

export interface IBuildWebsite extends Document {
  email: string;
  serviceType: string;
  mobile: string;
  firstName: string;
  lastName: string;
}

const BuildWebsiteSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    maxlength: [60, 'Email cannot be more than 60 characters'],
  },
  serviceType: {
    type: String,
    required: [true, 'Please provide a service type'],
    enum: ['Build Your Website'],
  },
  mobile: {
    type: String,
    required: [true, 'Please provide a mobile number'],
    maxlength: [20, 'Mobile number cannot be more than 20 characters'],
  },
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    maxlength: [30, 'First name cannot be more than 30 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    maxlength: [30, 'Last name cannot be more than 30 characters'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.BuildWebsite || mongoose.model<IBuildWebsite>('BuildWebsite', BuildWebsiteSchema);

