import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: false
    },
    firstName: {
        type: String,
        unique: false,
        required: false
    },
    lastName: {
        type: String,
        unique: false,
        required: false
    },
    orgName: {
        type: String,
        unique: false,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    subscriptionDate: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    emailVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    isProfessional: {
        type: Boolean,
        required: false,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        required: false,
        default: false,
    },
    profession: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isPremium: {
        type: Boolean,
        required: true,
        default: false,
    },
    isEnterprise: {
        type: Boolean,
        required: true,
        default: false,
    },
    image: {
        type: String,
        required: false
    },
    favouriteLocation: {
        type: String,
        required: false
    },
    members: {type: [mongoose.Types.ObjectId], ref: 'user', require: false},
    organization: {type: mongoose.Types.ObjectId, ref: 'user', require: false},
},{ timestamps: true}
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User