import routes from '@/Routes';
import { useRoutes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Header from '@/components/Header';

import { isShowModalState, modalState } from '@/recoil/modal';

const App = () => {
  const content = useRoutes(routes);
  const isShowModal = useRecoilValue(isShowModalState);
  const modal = useRecoilValue(modalState);

  return (
    <>
      {content}
      {isShowModal && modal}
    </>
  );
};

export default App;
