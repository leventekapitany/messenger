import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import {
  User
} from '@/interfaces/graphql-types';

export const GET_USERS = gql`
  query GetUsers($searchText: String) {
    users(searchText: $searchText) {
      name
    }
  }
`;

export const useGetUsersQuery = () => useQuery<{ users: [User] }>(GET_USERS);
