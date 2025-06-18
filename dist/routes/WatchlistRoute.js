"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WatchListController_1 = require("../controllers/WatchListController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const router = express_1.default.Router();
router.post('/create', AuthMiddleware_1.protect, WatchListController_1.createWatchlist);
router.get('/', AuthMiddleware_1.protect, WatchListController_1.getWatchlists);
router.post('/add-movie', AuthMiddleware_1.protect, WatchListController_1.addMovieToWatchlist);
router.post('/remove-movie', AuthMiddleware_1.protect, WatchListController_1.removeMovieFromWatchlist);
router.delete('/delete/:id', AuthMiddleware_1.protect, WatchListController_1.deleteWatchlist);
router.put('/update-name/:id', AuthMiddleware_1.protect, WatchListController_1.updateWatchlistName);
router.get('/movies/:id', AuthMiddleware_1.protect, WatchListController_1.getMoviesInWatchlist);
router.get('/:id', AuthMiddleware_1.protect, WatchListController_1.getWatchlistById);
router.get('/with-movies', AuthMiddleware_1.protect, WatchListController_1.getWatchlistsWithMovies);
exports.default = router;
//# sourceMappingURL=WatchlistRoute.js.map