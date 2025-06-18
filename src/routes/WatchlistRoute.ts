import express from 'express';
import { createWatchlist, getWatchlists, addMovieToWatchlist, removeMovieFromWatchlist, deleteWatchlist, updateWatchlistName, getMoviesInWatchlist, getWatchlistById, getWatchlistsWithMovies } from '../controllers/WatchListController';
import { protect } from '../middleware/AuthMiddleware';

const router = express.Router();
router.post('/create', protect, createWatchlist);
router.get('/', protect, getWatchlists);
router.post('/add-movie', protect, addMovieToWatchlist);
router.post('/remove-movie', protect, removeMovieFromWatchlist);
router.delete('/delete/:id', protect, deleteWatchlist);
router.put('/update-name/:id', protect, updateWatchlistName);
router.get('/movies/:id', protect, getMoviesInWatchlist);
router.get('/:id', protect, getWatchlistById);
router.get('/with-movies', protect, getWatchlistsWithMovies);

export default router;