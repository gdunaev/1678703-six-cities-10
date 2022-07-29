import {Review} from '../review/review';
import { comments } from '../../mocks/comments';
import {getCommentsSorting} from '../../utils';

type ReviewsListProps = {
  id: string | undefined;
};


export function ReviewsList(props: ReviewsListProps): JSX.Element {

  const {id} = props;
  const commentsOffer = comments.filter((comment) => String(comment.id) === id);
  const sortinedComments = getCommentsSorting(commentsOffer);
  const commentsQuantity = sortinedComments.length ? sortinedComments.length : 0;


  const getReviewsComponent = () => {
    if (commentsQuantity === 0) {
      return '';
    }
    return sortinedComments.map((value, currentId) => {
      const keyValue = `${value}-${currentId}`;
      return (
        <Review key={keyValue} review={value} />
      );
    });
  };


  return (
    <>
      <h2 className="reviews__title">
      Reviews &middot;{' '}
        <span className="reviews__amount">{commentsQuantity}</span>
      </h2>
      <ul className="reviews__list">
        {getReviewsComponent()}
      </ul>
    </>
  );
}


