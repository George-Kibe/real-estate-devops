import mongoose from "mongoose";

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

const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User