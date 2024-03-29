import {MainPage} from '../../pages/main-page/main-page';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import {NotFoundPage} from '../../pages/not-found-page/not-found-page';
import {OfferPage} from '../../pages/offer-page/offer-page';
import {LoginPage} from '../../pages/login-page/login-page';
import {FavoritesPage} from '../../pages/favorites-page/favorites-page';
import {PrivateRoute} from '../private-route/private-route';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { useAppSelector } from '../../hooks/index';
import {HistoryRouter} from '../history-router/history-router';
import {browserHistory} from '../../browser-history';
import { getLoadedDataStatus } from '../../store/data-process/selectors';
import {ScrollToTop} from '../../components/scroll-to-top/scroll-to-top';


export function App(): JSX.Element {

  const isDataLoaded = useAppSelector(getLoadedDataStatus);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop/>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        />
        <Route path={AppRoute.OfferId} element={<OfferPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}
