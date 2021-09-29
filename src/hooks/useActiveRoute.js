import { useHistory } from 'react-router-dom';

export default function useActiveRoute() {
  const router = useHistory();

  const isActive = (route) => {
    return router?.location?.pathname === route ? 'active' : '';
  };

  return [isActive];
}
