import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import PageTitle from '@/components/_common/PageTitle';

import SpaceCard from '@/components/SpaceCard';

import apis from '@/apis';

import styles from './styles';

type SpaceType = {
  name: string;
  imageUrl: string;
  id: number;
};

type Response = {
  spaces: SpaceType[];
  hasNext: boolean;
};

const SpaceList = () => {
  const { isLoading, isError, data, error } = useQuery<Response, AxiosError>(['spaces'], apis.getSpaces);

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
        장소 목록 (<span>{data?.spaces.length}</span>)
      </PageTitle>
      <div css={styles.contents}>
        {data?.spaces.map(space => (
          <SpaceCard spaceName={space.name} imageUrl={space.imageUrl} key={space.id} id={space.id} />
        ))}
      </div>
    </div>
  );
};

export default SpaceList;
