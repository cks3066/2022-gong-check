import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import PageTitle from '@/components/_common/PageTitle';

import JobCard from '@/components/JobCard';

import apis from '@/apis';

import styles from './styles';

type JobType = {
  id: number;
  name: string;
};

type Response = {
  jobs: JobType[];
  hasNext: boolean;
};

const JobList = () => {
  const { isLoading, isError, data, error } = useQuery<Response, AxiosError>(['jobs'], () => apis.getJobs({ spaceId }));
  const { spaceId } = useParams();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    alert(error.message);

    return <div>에러 발생</div>;
  }

  return (
    <div css={styles.layout}>
      <PageTitle>
        체크리스트 목록(<span>{data?.jobs.length}</span>)
      </PageTitle>
      <div css={styles.contents}>
        {data?.jobs.map(job => (
          <JobCard jobName={job.name} key={job.id} id={job.id} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
