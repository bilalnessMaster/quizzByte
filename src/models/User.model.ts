import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  gender: 'male' | 'female';
  streak: number;
  longestStreak: number;
  lastAttemptDate: Date | null;
  comparePassword(pwd: string): Promise<boolean>;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min: 6 },
    isAdmin: { type: Boolean, default: false },
    gender: { type: String, enum: ['male', 'female'] },
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastAttemptDate: { type: Date, default: null },
    authProvider : {type : String}
  },
  { timestamps: true }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (pwd: string): Promise<boolean> {
  try {
    return await bcrypt.compare(pwd, this.password);
  } catch (error) {
    console.log('Error occurred while comparing password:', error);
    return false;
  }
};

const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);

export default User;
