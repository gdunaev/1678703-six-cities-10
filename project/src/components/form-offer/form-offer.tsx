
import { useState, ChangeEvent, MouseEvent, FormEvent} from 'react';
import { store } from '../../store';
import {setCommentAction, } from '../../store/api-actions';
import {setCommentLoadedStatus} from '../../store/action';
import { useAppSelector, } from '../../hooks/index';

type FormOfferProps = {
  id: string | undefined;
};


export function FormOffer(props: FormOfferProps): JSX.Element {

  const {id} = props;
  const [formData, setFormData] = useState({
    comment: '',
    rating: 0,
  });
  const isCommentLoaded = useAppSelector((state) => state.isCommentLoaded);

  const currentId = id ? id : '';
  const handleRatingClick = (evt: MouseEvent<HTMLInputElement>) => {
    setFormData({...formData, 'rating': Number((evt.target as HTMLInputElement).value)});
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, 'comment': evt.target.value});
  };

  // eslint-disable-next-line no-console
  // console.log('11', isCommentLoaded);

  const handleCommentSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const comment = {
      id: currentId,
      formData,
    };
    store.dispatch(setCommentLoadedStatus(true));
    store.dispatch(setCommentAction(comment));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleCommentSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" >
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onClick={handleRatingClick} disabled = {isCommentLoaded}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onClick={handleRatingClick} disabled = {isCommentLoaded}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onClick={handleRatingClick} disabled = {isCommentLoaded}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onClick={handleRatingClick} disabled = {isCommentLoaded}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onClick={handleRatingClick} disabled = {isCommentLoaded}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" disabled = {isCommentLoaded} placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleCommentChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled = {isCommentLoaded}>Submit</button>
      </div>
    </form>
  );
}
