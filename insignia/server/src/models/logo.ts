import { Schema, model } from "mongoose"

const LogoSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
})

const Logo = model('Logo', LogoSchema);

export default Logo;