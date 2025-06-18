"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const Watchlist = mongoose_1.default.model('Watchlist', WatchlistSchema);
exports.default = Watchlist;
//# sourceMappingURL=Watchlist.js.map