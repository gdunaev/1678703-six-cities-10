import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Review} from './review';
import { fakeComment } from '../../utils/mocks';


describe('Component: Review', () => {
  it('should render correctly Review', () => {

    render(
      <Review review={fakeComment}/>
    );

    const userName = screen.getByText(fakeComment.user.name);
    const comment = screen.getByText(fakeComment.comment);
    const url = screen.getByAltText('Reviews avatar');
    const rating = screen.getByTestId(fakeComment.rating);
    const date = screen.getByTestId(fakeComment.date);

    expect(userName).toBeInTheDocument();
    expect(comment).toBeInTheDocument();
    expect(url).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});
