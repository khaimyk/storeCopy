import { makeAutoObservable } from "mobx";

class CatalogStore {
  _categories = [];
  _products = [];
  _category = null; // выбранная категория
  _page = 1; // текущая страница
  _count = 0; // сколько всего товаров
  _limit = 10; // товаров на страницу

  constructor() {
    makeAutoObservable(this);
  }

  get categories() {
    return this._categories;
  }

  get products() {
    return this._products;
  }

  get category() {
    return this._category;
  }

  get page() {
    return this._page;
  }

  get count() {
    return this._count;
  }

  get limit() {
    return this._limit;
  }

  get pages() {
    // всего страниц
    return Math.ceil(this.count / this.limit);
  }

  set categories(categories) {
    this._categories = categories;
  }

  set products(products) {
    this._products = products;
  }

  set category(id) {
    this.page = 1;
    this._category = id;
  }
  set page(page) {
    this._page = page;
  }

  set count(count) {
    this._count = count;
  }

  set limit(limit) {
    this._limit = limit;
  }
}

export default CatalogStore;
