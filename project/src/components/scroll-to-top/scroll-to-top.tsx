import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export function ScrollToTop() {
  const {pathname} = useLocation();

  // eslint-disable-next-line no-console
  console.log('11',pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
