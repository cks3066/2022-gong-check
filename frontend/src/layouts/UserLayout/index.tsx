import ErrorUserBoundary from '@/ErrorBoundary/ErrorUserBoundary';
import { Global } from '@emotion/react';
import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { ID } from '@/types';

import transitions from '@/styles/transitions';

import styles from './styles';

const UserLayout: React.FC = () => {
  const navigate = useNavigate();

  const { hostId } = useParams() as { hostId: ID };

  useEffect(() => {
    const tokenKey = sessionStorage.getItem('tokenKey');
    const token = localStorage.getItem(`${hostId}`);

    if (!tokenKey || tokenKey !== hostId || !token) {
      navigate(`/enter/${hostId}/pwd`);
    }
  }, []);

  return (
    <ErrorUserBoundary>
      <div css={styles.layout}>
        <Global styles={transitions} />
        <Suspense fallback={<div css={styles.fallback} />}>
          <Outlet />
        </Suspense>
      </div>
    </ErrorUserBoundary>
  );
};

export default UserLayout;
