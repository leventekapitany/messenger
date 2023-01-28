import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import {
  Room,
  MutationCreateRoomArgs
} from '@/interfaces/graphql-types';

export const GET_ROOMS = gql`
  query Rooms {
    rooms {
      roomId
      name
      users {
        userId
        name
      }
    }
  }
`;

const CREATE_ROOM = gql`
  mutation CreateRoom($name: String) {
    createRoom(name: $name) {
      roomId
      name
      users {
        userId
        name
      }
    }
  }
`

export const useGetRoomsQuery = () => useQuery<{ rooms: [Room] }>(GET_ROOMS);
export const useCreateRoomQuery = () => useMutation<{ createRoom: Room }, MutationCreateRoomArgs>(CREATE_ROOM);
