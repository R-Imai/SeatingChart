
export type UserInfo = {
  userCd: string;
  name: string;
  furigana?: string | null;
}

const USER_INFO__KEY = 'user-info'

const isUserInfo = (data: unknown): data is UserInfo => {
  const userInfo = data as UserInfo;
  return typeof userInfo.userCd === 'string' && typeof userInfo.name === 'string' && (userInfo.furigana === null || typeof userInfo.furigana === 'undefined'|| typeof userInfo.furigana === 'string');
};

export function getUserInfoStorage(): UserInfo | null {
  const storageData = localStorage.getItem(USER_INFO__KEY);
  if (storageData === null) {
    return null;
  }
  const userInfo = JSON.parse(storageData);
  if (!isUserInfo(userInfo)) {
    return null;
  }
  return userInfo;
}

export function setUserInfoStorage(info: UserInfo) {
  const infoStr = JSON.stringify(info);
  localStorage.setItem(USER_INFO__KEY, infoStr);
}
