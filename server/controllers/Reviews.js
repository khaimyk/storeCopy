import ReviewsModel from "../models/Reviews.js";
import AppError from "../errors/AppError.js";

class Reviews {
  async getAll(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error("Не указан id товара");
      }
      const reviews = await ReviewsModel.getAll(req.params.productId);
      res.json(reviews);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error("Не указан id товара");
      }
      if (!req.params.id) {
        throw new Error("Не указано id свойства");
      }
      const review = await ReviewsModel.getOne(
        req.params.productId,
        req.params.id
      );
      res.json(review);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async create(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error("Не указан id товара");
      }
      if (Object.keys(req.body).length === 0) {
        throw new Error("Нет данных для создания");
      }

      const review = await ReviewsModel.create(
        req.auth.userId,
        req.params.productId,
        req.body
      );
      res.json(review);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error("Не указан id товара");
      }
      if (!req.params.id) {
        throw new Error("Не указано id свойства");
      }
      const review = await ReviewsModel.delete(
        req.params.productId,
        req.params.id
      );
      res.json(review);
    } catch (e) {
      next(AppError.badRequest(e.message));
    }
  }
}

export default new Reviews();
