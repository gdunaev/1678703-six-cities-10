import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Navigate} from 'react-router-dom';
import {useState, memo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import { logoutAction } from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {HeaderDetail} from '../header-detail/header-detail';


type HeaderProps = {
    mainPage: boolean;
    favoritePage: boolean;
  };


function Header(props: HeaderProps): JSX.Element{

  const {mainPage, favoritePage} = props;
  const [navigation, setNavigation] = useState(false);
  const [isNavigationLogin, setNavigationLogin] = useState(false);
  const {status, email} = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  if (isNavigationLogin) {
    if(status !== AuthorizationStatus.Auth) {
      return <Navigate to={AppRoute.Login} state={{page: 'login'}}/>;
    }
    return <Navigate to={AppRoute.Favorites} />;
  }

  const handleProfileClick = () => {
    if(!favoritePage) {
      setNavigationLogin(true);
    }
  };

  if (navigation && !mainPage) {
    return <Navigate to={AppRoute.Main} />;
  }
  const handleLogoClick = () => {
    setNavigation(true);
  };
  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={mainPage ? 'header__logo-link header__logo-link--active' : 'header__logo-link'}
              to="#"
              onClick={handleLogoClick}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav" >
            <ul className="header__nav-list">
              <li className="header__nav-item user" onClick={handleProfileClick}>
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to="#"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    {status === AuthorizationStatus.Auth ? email : 'Sign in'}
                  </span>

                  <HeaderDetail status={status}/>

                </Link>
              </li>
              { status === AuthorizationStatus.Auth &&
              <li className="header__nav-item">
                <Link className="header__nav-link" to="#" onClick={handleLogoutClick}>
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default memo(Header, (prevProps, nextProps) => prevProps.mainPage === nextProps.mainPage && prevProps.favoritePage === nextProps.favoritePage);
