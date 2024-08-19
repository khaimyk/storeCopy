import { Reviews as ReviewsMapping } from "./mapping.js";
import { Product as ProductMapping } from "./mapping.js";
import { User as UserMapping } from "./mapping.js";

class Reviews {
  async getAll(productId) {
    const product = await ProductMapping.findByPk(productId);
    if (!product) {
      throw new Error("Товар не найден в БД");
    }
    const reviews = await ReviewsMapping.findAll({
      where: { productId },
    });
    return reviews;
  }

  async getOne(productId, id) {
    const product = await ProductMapping.findByPk(productId);
    if (!product) {
      throw new Error("Товар не найден в БД");
    }
    const review = await ReviewsMapping.findOne({
      where: { productId, id },
    });
    if (!review) {
      throw new Error("Свойство товара не найдено в БД");
    }
    return review;
  }

  async create(userId, productId, data) {
    const product = await ProductMapping.findByPk(productId);
    if (!product) {
      throw new Error("Товар не найден в БД");
    }
    const user = await UserMapping.findByPk(userId);
    if (!user) {
      throw new Error("Пользователь не найден в БД");
    }

    const { rating, comment } = data;
    const review = await ReviewsMapping.create({
      userId,
      productId,
      rating,
      comment,
    });
    return review;
  }

  async delete(productId, id) {
    const product = await ProductMapping.findByPk(productId);
    if (!product) {
      throw new Error("Товар не найден в БД");
    }
    const review = await ReviewsMapping.findOne({
      where: { productId, id },
    });
    if (!review) {
      throw new Error("Відгук товара не найдено в БД");
    }
    await review.destroy();
    return review;
  }
}

export default new Reviews();
