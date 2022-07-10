import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/_common/Button';
import Dimmer from '@/components/_common/Dimmer';
import Input from '@/components/_common/Input';

import useModal from '@/hooks/useModal';

import fetchUser from '@/apis/user';

import ModalPortal from '@/ModalPortal';

import theme from '@/styles/theme';

import styles from './styles';

interface NameModalProps {
  title: string;
  detail: string;
  placeholder: string;
  buttonText: string;
  jobId: string;
}

const NameModal = ({ title, detail, placeholder, buttonText, jobId }: NameModalProps) => {
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const { hideModal } = useModal();
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { hostId } = useParams();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isTyped = !!e.target.value;
    setName(e.target.value);
    setIsDisabledButton(!isTyped);
  };

  const handleClickButton = async () => {
    try {
      await fetchUser.postJobComplete({ jobId, author: name });
      alert('제출 되었습니다.');
      hideModal();
      navigate(`/${hostId}/spaces`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ModalPortal>
      <Dimmer isAbleClick={true}>
        <div css={styles.container}>
          <h1 css={styles.title}>{title}</h1>
          <span css={styles.detail}>{detail}</span>
          <Input placeholder={placeholder} onChange={handleOnChange} value={name} />
          <Button
            css={css`
              margin-bottom: 0;
              width: 256px;
              background: ${isDisabledButton ? theme.colors.gray : theme.colors.primary};
            `}
            onClick={handleClickButton}
            disabled={isDisabledButton}
          >
            {buttonText}
          </Button>
        </div>
      </Dimmer>
    </ModalPortal>
  );
};

export default NameModal;
