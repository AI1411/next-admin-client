import {atom, useRecoilState} from 'recoil';
import {recoilPersist} from 'recoil-persist';
import {useEffect} from "react";

const {persistAtom} = recoilPersist();

export const userState = atom({
  key: 'user',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const useAuthenticate = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    if (user) return;

    return user;
  })
};
