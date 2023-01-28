import jwtDecode from 'jwt-decode';
import { defineStore } from 'pinia';

import type { TokenPayload } from 'google-auth-library';
import type { Room } from '@/interfaces/graphql-types';

// eslint-disable-next-line import/no-cycle
import router from '../main';

export type StoreRooms = { [roomId: string]: Room };

interface UserState {
  accessToken: string;
  tokenPayload: TokenPayload | undefined;
  email: TokenPayload['email'];
  name: TokenPayload['name'];
  picture: TokenPayload['picture'];
  userId: TokenPayload['sub'];
  rooms: StoreRooms;
  showRouter: boolean;
  hideNavigation: boolean;
  theme: 'light' | 'dark';
}

function isValidToken(payload: UserState['tokenPayload']) {
  return !!payload && payload.exp * 1000 > Date.now();
}

function getTheme() {
  if (localStorage.getItem('theme') === 'light') {
    return 'light';
  }

  if (localStorage.getItem('theme') === 'dark') {
    return 'dark';
  }
  return 'light';
}

function getUserFromToken(): UserState {
  const accessToken = localStorage.getItem('token') || '';
  const payload = accessToken ? jwtDecode<TokenPayload>(accessToken) : undefined;

  return {
    accessToken,
    tokenPayload: payload,
    email: payload?.email || '',
    name: payload?.name || '',
    picture: payload?.picture || '',
    userId: payload?.sub || '',
    rooms: {},
    showRouter: true,
    hideNavigation: false,
    theme: getTheme(),
  };
}

function getRooms(): StoreRooms {
  const roomsItems = localStorage.getItem('rooms');
  if (!roomsItems) {
    return {};
  }

  const roomsObject = JSON.parse(roomsItems);
  return roomsObject;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({ ...getUserFromToken(), rooms: getRooms() }),
  getters: {
    loggedIn(state) {
      return isValidToken(state.tokenPayload);
    },
    firstRoomId(state) {
      const { rooms } = state;
      if (!rooms) {
        return null;
      }
      return rooms[Object.keys(rooms)[0]].roomId;
    },
  },
  actions: {
    resetUserState() {
      this.$reset();
    },
    logout() {
      console.log('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('rooms');
      console.log(this.loggedIn);
      this.$reset();
      router.replace({ name: 'Login' });
    },
    setUserFromToken(token: string) {
      localStorage.setItem('token', token);
      this.$state = getUserFromToken();
      router.replace({ name: 'Empty' });
    },
    setRooms(rooms: Room[]) {
      const entries = rooms.map(r => [r.roomId, r]);
      const roomsObject = Object.fromEntries(entries);
      this.$state.rooms = roomsObject;

      localStorage.setItem('rooms', JSON.stringify(roomsObject));
    },
    addRoom(room: Room) {
      this.setRooms([...Object.values(this.rooms), room]);
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', this.theme);
    },
  },
});
