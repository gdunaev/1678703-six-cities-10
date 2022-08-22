import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../history-router/history-router';
import { fakeImg } from '../../utils/mocks';
import {ImagesOffer} from './images-offer';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';


const mockStore = configureMockStore();

describe('Component: ImagesOffer', () => {
  it('should render correctly ImagesOffer', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <ImagesOffer image={fakeImg()}/>
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByAltText('Photo studio');

    expect(linkElement).toBeInTheDocument();
  });
});
