import CheckBox from '@/components/_common/Checkbox';

import fetchUser from '@/apis/user';

import styles from './styles';

type TaskType = {
  id: number;
  name: string;
  checked: boolean;
};

type TaskCardProps = {
  tasks: TaskType[];
  refetchGetTasks: any;
};

const TaskCard = ({ tasks, refetchGetTasks }: TaskCardProps) => {
  const handleClickCheckBox = async (
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.ChangeEvent<HTMLElement>,
    id: number
  ) => {
    e.preventDefault();
    await fetchUser.postCheckTask({ taskId: id });
    refetchGetTasks();
  };

  return (
    <div css={styles.taskCard}>
      {tasks.map((task, id) => (
        <div key={id} css={styles.task}>
          <CheckBox
            onChange={e => handleClickCheckBox(e, task.id)}
            checked={task.checked}
            id={JSON.stringify(task.id)}
          />
          <span>{task.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
