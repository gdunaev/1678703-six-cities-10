import {Review} from '../review/review';
import {getCommentsSorting} from '../../utils';
import {useAppSelector} from '../../hooks/index';
import {fetchCommentsAction} from '../../store/api-actions';
import { useEffect } from 'react';
import {store} from '../../store/index';
import {getComments} from '../../store/data-process/selectors';

type ReviewsListProps = {
  id: string | undefined;
};


export function ReviewsList(props: ReviewsListProps): JSX.Element {

  const {id} = props;
  const comments = useAppSelector(getComments);

  useEffect(() => {
    if (!comments || comments.id !== id) {
      store.dispatch(fetchCommentsAction(id as string));
    }
  }, []);

  const sortinedComments = comments ? getCommentsSorting(comments.data) : [];
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


