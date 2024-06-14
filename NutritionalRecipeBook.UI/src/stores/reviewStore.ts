import { makeAutoObservable } from 'mobx';

import { ReviewModel } from 'models/ReviewModel';

class ReviewStore {
  reviews: ReviewModel[] = [];
  currentPage = 0;
  totalPages: number[] = [];
  totalCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getAll() {
    return this.reviews;
  }

  setAll(reviews: ReviewModel[]) {
    this.reviews = reviews;
  }

  setTotalCount(num: number) {
    this.totalCount = num;
  }

  updateCurrentPage(num: number) {
    this.currentPage = num;
  }

  updateTotalPages(num: number[]) {
    this.totalPages = num;
  }
}

const reviewStore = new ReviewStore();
export default reviewStore;
