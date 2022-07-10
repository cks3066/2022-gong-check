import React from 'react';
import { atom } from 'recoil';

export const isShowModalState = atom({
  key: '@modal/isShowModalState',
  default: !localStorage.getItem('user'),
});

export const modalState = atom<React.ReactElement | string>({
  key: '@modal/modalState',
  default: '',
});
