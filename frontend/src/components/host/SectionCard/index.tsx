import TaskBox from './TaskBox';
import useSectionCardDefault from './useSectionCardDefault';
import { BiNews } from '@react-icons/all-files/bi/BiNews';
import { BiX } from '@react-icons/all-files/bi/BiX';

import { SectionType } from '@/types';

import styles from './styles';

interface SectionCardProps {
  section: SectionType;
  sectionIndex: number;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, sectionIndex }) => {
  const { onChange, onClickDelete, onClickCreate, onClickSectionDetail, hasSectionDetailInfo } =
    useSectionCardDefault(sectionIndex);

  return (
    <div css={styles.container}>
      <BiX css={styles.deleteButton} size={30} onClick={onClickDelete} />
      <div css={styles.titleWrapper}>
        <input
          css={styles.input}
          placeholder="구역 이름을 입력주세요."
          defaultValue={section.name}
          maxLength={10}
          onChange={onChange}
          required
        />
        <BiNews css={styles.detailButton(hasSectionDetailInfo())} size={26} onClick={onClickSectionDetail} />
      </div>
      {section.tasks.map((task, taskIndex) => (
        <TaskBox task={task} taskIndex={taskIndex} sectionIndex={sectionIndex} key={task.id} />
      ))}
      <button css={styles.newTaskButton} onClick={onClickCreate} type="button">
        + 새 작업 추가
      </button>
    </div>
  );
};

export default SectionCard;