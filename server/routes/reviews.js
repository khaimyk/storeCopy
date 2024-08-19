import express from "express";
import ReviewsController from "../controllers/Reviews.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = new express.Router();

router.get(
  "/product/:productId([0-9]+)/reviews/getall",
  ReviewsController.getAll
);
router.get(
  "/product/:productId([0-9]+)/reviews/getone/:id([0-9]+)",
  ReviewsController.getOne
);
router.post(
  "/product/:productId([0-9]+)/reviews/create",
  authMiddleware,
  ReviewsController.create
);

router.delete(
  "/product/:productId([0-9]+)/reviews/delete/:id([0-9]+)",
  authMiddleware,
  adminMiddleware,
  ReviewsController.delete
);

export default router;
