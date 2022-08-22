import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../history-router/history-router';
import { fakeOffer } from '../../utils/mocks';
import {Favorite} from './favorite';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, } from '../../const';


const mockStore = configureMockStore();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {isDataLoaded: false},
});

describe('Component: Favorite', () => {
  it('should render correctly Favorite', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorite offer={fakeOffer}/>
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByAltText('PlaceImg');

    expect(linkElement).toBeInTheDocument();
  });
});
