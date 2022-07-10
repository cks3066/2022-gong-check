import { axiosInstance, axiosInstanceToken } from './config';

interface Parameter {
  hostId: number;
  password: string;
  spaceId: number;
  jobId: number | string | undefined;
  author: string;
  taskId: number;
}

// 비밀번호 입력
const postPassword = async ({ hostId, password }: Partial<Parameter>) => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: `api/hosts/${hostId}/enter`,
    data: {
      password,
    },
  });
  return data;
};

// 공간 목록 {page,size}
const getSpaces = async () => {
  const { data } = await axiosInstanceToken({
    method: 'GET',
    url: `api/spaces`,
  });
  return data;
};

// 업무 종류
const getJobs = async ({ spaceId }: Partial<Parameter>) => {
  const { data } = await axiosInstanceToken({
    method: 'GET',
    url: `/api/spaces/${spaceId}/jobs`,
  });
  return data;
};

// 진행중인 작업이 있는지 확인
const getJobActive = async ({ jobId }: Partial<Parameter>) => {
  const { data } = await axiosInstanceToken({
    method: 'GET',
    url: `/api/jobs/${jobId}/active`,
  });
  return data;
};

// 새 작업 생성
const postNewTasks = async ({ jobId }: Partial<Parameter>) => {
  return await axiosInstanceToken({
    method: 'POST',
    url: `/api/jobs/${jobId}/tasks/new`,
  });
};

// 진행중인 작업 불러오기
const getTasks = async ({ jobId }: Partial<Parameter>) => {
  const { data } = await axiosInstanceToken({
    method: 'GET',
    url: `/api/jobs/${jobId}/tasks`,
  });
  return data;
};

// 체크박스 체크하기
const postCheckTask = async ({ taskId }: Partial<Parameter>) => {
  return await axiosInstanceToken({
    method: 'POST',
    url: `/api/tasks/${taskId}/flip`,
  });
};

// 제출하기
const postJobComplete = async ({ jobId, author }: Partial<Parameter>) => {
  return await axiosInstanceToken({
    method: 'POST',
    url: `/api/jobs/${jobId}/complete`,
    data: {
      author,
    },
  });
};

const fetchUser = {
  postPassword,
  getSpaces,
  getJobs,
  getJobActive,
  postNewTasks,
  getTasks,
  postCheckTask,
  postJobComplete,
};

export default fetchUser;
