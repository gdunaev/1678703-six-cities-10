import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter} from '../../components/history-router/history-router';
import {NotFoundPage} from './not-found-page';


describe('Component: NotFoundPage', () => {
  it('should render correctly NotFoundPage', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <NotFoundPage />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404. Page not found');
    const linkElement = screen.getByText('Вернуться на главную');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
