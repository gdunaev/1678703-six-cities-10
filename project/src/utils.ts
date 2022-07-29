import {SortingType, PERCENT_RATING} from './const';
import {Offers, Offer} from './types/offer';
import {CommentsType, CommentType} from './types/comments';
import {QUANTITY_COMMENTS} from './const';
// import dayjs from 'dayjs';
// import {Dayjs} from ''

let typeLowHigh = true;

function comparePrice (elementA: Offer, elementB: Offer) {
  const rankA = +elementA.price;
  const rankB = +elementB.price;
  return typeLowHigh ? rankA - rankB : rankB - rankA;
}

function compareRated (elementA: Offer, elementB: Offer) {
  const rankA = elementA.rating;
  const rankB = elementB.rating;
  return rankB - rankA;
}

function compareDates (elementA: CommentType, elementB: CommentType) {
  const rankA: number = + new Date(elementA.date);
  const rankB: number = + new Date(elementB.date);
  return rankB - rankA;
}

export const getOffersSorting = (sortingType: string, offers: Offers) => {
  switch (sortingType) {
    case SortingType.Popular:
      return offers.slice();
    case SortingType.LowToHigh:
      typeLowHigh = true;
      return offers.slice().sort(comparePrice);
    case SortingType.HighToLow:
      typeLowHigh = false;
      return offers.slice().sort(comparePrice);
    case SortingType.TopRated:
      return offers.slice().sort(compareRated);
    default:
      return offers.slice();
  }
};

export const getRating = (rating: number) => ({
  width: `${Math.round(rating) * PERCENT_RATING}%`,
});

export const getCommentsSorting = (comments: CommentsType) => comments.slice().sort(compareDates).slice(0, QUANTITY_COMMENTS);
