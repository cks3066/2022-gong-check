import './recoil/modal';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import JobList from '@/pages/JobList';
import SpaceList from '@/pages/SpaceList';
import TaskList from '@/pages/TaskList';

import Header from '@/components/Header';
import PasswordModal from '@/components/PasswordModal';

import useModal from '@/hooks/useModal';

const DefaultLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const UserLayout = () => {
  const { showModal } = useModal();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      showModal(
        <PasswordModal
          title="비밀번호 입력"
          detail="해당 공간의 관계자만 접근할 수 있습니다."
          placeholder="비밀번호를 입력해주세요."
          buttonText="확인"
        />
      );
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: ':hostId',
        element: <UserLayout />,
        children: [
          {
            path: 'spaces',
            element: <SpaceList />,
          },
          {
            path: 'spaces/:spaceId',
            element: <JobList />,
          },
          {
            path: 'spaces/:spaceId/:jobId',
            element: <TaskList />,
          },
        ],
      },
    ],
  },
];

export default routes;
