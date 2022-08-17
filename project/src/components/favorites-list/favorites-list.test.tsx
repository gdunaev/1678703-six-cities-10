import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../history-route/history-route';
import { fakeOffers } from '../../utils/mocks';
import {FavoritesList} from './favorites-list';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';


const mockStore = configureMockStore();

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const currentCity = 'Test city';
    const currentOffers = fakeOffers();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <FavoritesList currentCity={currentCity} currentOffers={currentOffers}/>
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByText(currentCity);

    expect(linkElement).toBeInTheDocument();
  });
});
