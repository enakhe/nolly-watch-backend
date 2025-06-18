import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Watchlist from "../model/Watchlist";
import { AuthenticatedRequest } from "../middleware/AuthMiddleware";

// Create a watchlist
export const createWatchlist = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { name } = req.body as { name: string };

        if (!name) {
            res.status(400);
            throw new Error("Watchlist name is required");
        }

        const watchlist = await Watchlist.create({
            name,
            user: req.user._id
        });

        res.status(201).json(watchlist);
    }
);

// Get all watchlists for a user
export const getWatchlists = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const watchlists = await Watchlist.find({ user: req.user._id });

        res.status(200).json(watchlists);
    }
);

// Add a movie to a watchlist
export const addMovieToWatchlist = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { watchlistId, movieId } = req.body as { watchlistId: string; movieId: string };

        if (!watchlistId || !movieId) {
            res.status(400);
            throw new Error("Watchlist ID and Movie ID are required");
        }

        const watchlist = await Watchlist.findById(watchlistId
        );  
        if (!watchlist) {
            res.status(404);
            throw new Error("Watchlist not found");
        }
        if (watchlist.movies.includes(movieId)) {
            res.status(400);
            throw new Error("Movie already exists in the watchlist");
        }
        watchlist.movies.push(movieId);
        await watchlist.save();
        res.status(200).json(watchlist);
    }
);

// Remove a movie from a watchlist
export const removeMovieFromWatchlist = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { watchlistId, movieId } = req.body as { watchlistId: string; movieId: string };

        if (!watchlistId || !movieId) {
            res.status(400);
            throw new Error("Watchlist ID and Movie ID are required");
        }

        const watchlist = await Watchlist.findById(watchlistId
        );
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
        await watchlist.save();
        res.status(200).json(watchlist);
    }
);

// Delete a watchlist
export const deleteWatchlist = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { watchlistId } = req.body as { watchlistId: string };

        if (!watchlistId) {
            res.status(400);
            throw new Error("Watchlist ID is required");
        }

        const watchlist = await Watchlist.findByIdAndDelete(watchlistId);
        if (!watchlist) {
            res.status(404);
            throw new Error("Watchlist not found");
        }

        res.status(200).json({ message: "Watchlist deleted successfully" });
    }
);

// Update a watchlist name
export const updateWatchlistName = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { watchlistId, name } = req.body as { watchlistId: string; name: string };

        if (!watchlistId || !name) {
            res.status(400);
            throw new Error("Watchlist ID and name are required");
        }

        const watchlist = await Watchlist.findById(watchlistId
        );
        if (!watchlist) {
            res.status(404);
            throw new Error("Watchlist not found");
        }
        watchlist.name = name;
        await watchlist.save();
        res.status(200).json(watchlist);
    }
);

// Get a specific watchlist by ID
export const getWatchlistById = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { watchlistId } = req.params as { watchlistId: string };

        if (!watchlistId) {
            res.status(400);
            throw new Error("Watchlist ID is required");
        }

        const watchlist = await Watchlist.findById(watchlistId
        );
        if (!watchlist) {
            res.status(404);
            throw new Error("Watchlist not found");
        }

        res.status(200).json(watchlist);
    }
);

// Get all movies in a watchlist
export const getMoviesInWatchlist = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const { watchlistId } = req.params as { watchlistId: string };

        if (!watchlistId) {
            res.status(400);
            throw new Error("Watchlist ID is required");
        }

        const watchlist = await Watchlist.findById(watchlistId
        ).populate("movies");
        if (!watchlist) {
            res.status(404);
            throw new Error("Watchlist not found");
        }
        res.status(200).json(watchlist.movies);
    }
);

// Get all watchlists for a user with populated movies
export const getWatchlistsWithMovies = expressAsyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const watchlists = await Watchlist.find({ user: req.user._id }).populate("movies");

        res.status(200).json(watchlists);
    }
);