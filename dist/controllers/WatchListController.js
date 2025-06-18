"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWatchlistsWithMovies = exports.getMoviesInWatchlist = exports.getWatchlistById = exports.updateWatchlistName = exports.deleteWatchlist = exports.removeMovieFromWatchlist = exports.addMovieToWatchlist = exports.getWatchlists = exports.createWatchlist = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Watchlist_1 = __importDefault(require("../model/Watchlist"));
// Create a watchlist
exports.createWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Watchlist name is required");
    }
    const watchlist = yield Watchlist_1.default.create({
        name,
        user: req.user._id
    });
    res.status(201).json(watchlist);
}));
// Get all watchlists for a user
exports.getWatchlists = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const watchlists = yield Watchlist_1.default.find({ user: req.user._id });
    res.status(200).json(watchlists);
}));
// Add a movie to a watchlist
exports.addMovieToWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId, movieId } = req.body;
    if (!watchlistId || !movieId) {
        res.status(400);
        throw new Error("Watchlist ID and Movie ID are required");
    }
    const watchlist = yield Watchlist_1.default.findById(watchlistId);
    if (!watchlist) {
        res.status(404);
        throw new Error("Watchlist not found");
    }
    if (watchlist.movies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already exists in the watchlist");
    }
    watchlist.movies.push(movieId);
    yield watchlist.save();
    res.status(200).json(watchlist);
}));
// Remove a movie from a watchlist
exports.removeMovieFromWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId, movieId } = req.body;
    if (!watchlistId || !movieId) {
        res.status(400);
        throw new Error("Watchlist ID and Movie ID are required");
    }
    const watchlist = yield Watchlist_1.default.findById(watchlistId);
    if (!watchlist) {
        res.status(404);
        throw new Error("Watchlist not found");
    }
    const movieIndex = watchlist.movies.indexOf(movieId);
    if (movieIndex === -1) {
        res.status(404);
        throw new Error("Movie not found in the watchlist");
    }
    watchlist.movies.splice(movieIndex, 1);
    yield watchlist.save();
    res.status(200).json(watchlist);
}));
// Delete a watchlist
exports.deleteWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId } = req.body;
    if (!watchlistId) {
        res.status(400);
        throw new Error("Watchlist ID is required");
    }
    const watchlist = yield Watchlist_1.default.findByIdAndDelete(watchlistId);
    if (!watchlist) {
        res.status(404);
        throw new Error("Watchlist not found");
    }
    res.status(200).json({ message: "Watchlist deleted successfully" });
}));
// Update a watchlist name
exports.updateWatchlistName = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId, name } = req.body;
    if (!watchlistId || !name) {
        res.status(400);
        throw new Error("Watchlist ID and name are required");
    }
    const watchlist = yield Watchlist_1.default.findById(watchlistId);
    if (!watchlist) {
        res.status(404);
        throw new Error("Watchlist not found");
    }
    watchlist.name = name;
    yield watchlist.save();
    res.status(200).json(watchlist);
}));
// Get a specific watchlist by ID
exports.getWatchlistById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId } = req.params;
    if (!watchlistId) {
        res.status(400);
        throw new Error("Watchlist ID is required");
    }
    const watchlist = yield Watchlist_1.default.findById(watchlistId);
    if (!watchlist) {
        res.status(404);
        throw new Error("Watchlist not found");
    }
    res.status(200).json(watchlist);
}));
// Get all movies in a watchlist
exports.getMoviesInWatchlist = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { watchlistId } = req.params;
    if (!watchlistId) {
        res.status(400);
        throw new Error("Watchlist ID is required");
    }
    const watchlist = yield Watchlist_1.default.findById(watchlistId).populate("movies");
    if (!watchlist) {
        res.status(404);
        throw new Error("Watchlist not found");
    }
    res.status(200).json(watchlist.movies);
}));
// Get all watchlists for a user with populated movies
exports.getWatchlistsWithMovies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const watchlists = yield Watchlist_1.default.find({ user: req.user._id }).populate("movies");
    res.status(200).json(watchlists);
}));
//# sourceMappingURL=WatchListController.js.map