import { FaMapMarkedAlt } from '@react-icons/all-files/fa/FaMapMarkedAlt';

import LazyImage from '@/components/common/LazyImage';

import styles from './styles';

interface SectionInfoPreviewProps {
  imageUrl: string;
  onClick: () => void;
}

const SectionInfoPreview: React.FC<SectionInfoPreviewProps> = ({ imageUrl, onClick }) => {
  const isImage = imageUrl !== '';

  return (
    <div css={styles.wrapper} onClick={onClick}>
      <div css={styles.imageWrapper(isImage)}>{isImage && <LazyImage css={styles.image} imageUrl={imageUrl} />}</div>
      <FaMapMarkedAlt css={styles.icon} size={24} />
    </div>
  );
};

export default SectionInfoPreview;
