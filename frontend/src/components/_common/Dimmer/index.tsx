import { css } from '@emotion/react';

import useModal from '@/hooks/useModal';

import theme from '@/styles/theme';

interface DimmerProps {
  children: React.ReactNode;
  isAbleClick?: boolean;
}

const Dimmer = ({ children, isAbleClick = false }: DimmerProps) => {
  const { hideModal } = useModal();

  const handleClickDimmed = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target && isAbleClick) {
      hideModal();
    }
  };

  return (
    <div
      css={css`
        background-color: ${theme.colors.shadow80};
        width: 400px;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      onClick={handleClickDimmed}
    >
      {children}
    </div>
  );
};

export default Dimmer;
