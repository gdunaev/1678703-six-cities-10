import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {LoadingScreen} from './loading-screen';


describe('Component: LoadingScreen', () => {
  it('should render correctly LoadingScreen', () => {

    render(
      <LoadingScreen/>
    );

    const h1Element = screen.getByText('Loading...');

    expect(h1Element).toBeInTheDocument();
  });
});
