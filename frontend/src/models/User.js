import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        required: true
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
    image: {
        type: String,
        required: false
    },
    members: {type: [mongoose.Types.ObjectId], ref: 'user', require: false},
},{ timestamps: true}
)

const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User