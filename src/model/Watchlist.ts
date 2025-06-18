import mongoose from "mongoose";
const { Schema } = mongoose;

const WatchlistSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    movies: [{
        type: String,
        required: true
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

WatchlistSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
export default Watchlist;