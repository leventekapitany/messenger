import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

import {
  Message,
  MutationSendMessageArgs,
  QueryMessagesArgs,
} from '@/interfaces/graphql-types';
import { IGetMessages } from '@/interfaces/message';

const POLL_INTERVAL = +import.meta.env.VITE_QUERY_POLL_INTERVAL || undefined;

export const GET_MESSAGES = gql`
  query Messages($interval: IntervalInput, $limit: Int!, $roomId: ID!) {
    messages(interval: $interval, limit: $limit, roomId: $roomId) {
      content
      timestamp
      timestampISO
      sender
      photos {
        uri
        timestamp
      }
      reactions {
        reaction
        actor
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($message: MessageInput) {
    sendMessage(message: $message) {
      content
      timestamp
      timestampISO
      sender
      photos {
        uri
        timestamp
      }
      reactions {
        reaction
        actor
      }
    }
  }
`;

export const useGetMessagesQuery = (args: QueryMessagesArgs) =>
  useQuery<IGetMessages>(GET_MESSAGES, args, {
    pollInterval: POLL_INTERVAL,
  });

export const useSendMessageMutation = () =>
  useMutation<{ sendMessage: Message }, MutationSendMessageArgs>(SEND_MESSAGE);
