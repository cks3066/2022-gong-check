import React from 'react';
import { useSetRecoilState } from 'recoil';

import { isShowModalState, modalState } from '@/recoil/modal';

const useModal = () => {
  const setIsShowModal = useSetRecoilState(isShowModalState);
  const setModal = useSetRecoilState(modalState);

  const showModal = (element: React.ReactElement | string) => {
    setIsShowModal(true);
    setModal(element);
  };

  const hideModal = () => {
    setIsShowModal(false);
    setModal('');
  };

  return { showModal, hideModal };
};

export default useModal;
