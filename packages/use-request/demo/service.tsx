import Mock from 'mockjs';

interface UserListItem {
  id: string,
  name: string,
  gender: 'male' | 'female',
  email: string,
  disabled: boolean
}

interface LoadMoreItem {
  id?: string,
  name: string
}

const email = () => (
  Mock.mock({
    'data|5': ['@email'],
  })
)

const userSchool = id => {
  switch (id) {
    case '1':
      return 'Tsinghua University';
    case '2':
      return 'Beijing University';
    case '3':
      return 'Zhejiang University';
    default:
      return ''
  }
}

const userList = (current, pageSize) => (
  Mock.mock({
    total: 55,
    [`list|${pageSize}`]: [{
      id: '@guid',
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false
    }],
  })
)

export function getUsername(): Promise<string> {
  const userInfo = Mock.mock('@name');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userInfo);
    }, 1000);
  });
}

export function changeUsername(username: string): Promise<{ success: boolean }> {
  console.log(username);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export function deleteUser(userId: string): Promise<{ success: boolean }> {
  console.log(userId);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export async function getEmail(search: string): Promise<string[]> {
  console.log(search);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(email().data);
    }, 1000);
  });
}

export async function getArticle(type?: string): Promise<{ data: string, time: number }> {
  console.log(type);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime()
      })
    }, 1000)
  });
}

export async function getCurrentTime(): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(new Date().getTime())
    }, 100)
  });
}

export async function getUserSchool(userId: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userSchool(userId))
    }, 1000)
  });
}

export async function getUserList(params: { current: number, pageSize: number, gender?: string }): Promise<{ total: number, list: UserListItem[] }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userList(params.current, params.pageSize))
    }, 1000)
  });
}

const resultData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export async function getLoadMoreList(nextId: any, limit: any): Promise<{ list: LoadMoreItem[], nextId: string | undefined }> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex(i => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end).map(id => ({
    id,
    name: `project ${id} (server time: ${Date.now()})`
  }));
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId
      });
    }, 1000);
  });
}
