import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
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
    members: {type: [mongoose.Types.ObjectId], ref: 'user', require: false},
},{ timestamps: true}
)

const User = mongoose.models.user || mongoose.model('user', UserSchema);

export default User