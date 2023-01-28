export interface IMessage {
  __typename: string;
  sender: string;
  timestamp: number;
  timestampISO: string;
  content: string;
  migrated?: boolean;
  photos?: IPhoto[];
  reactions?: IReaction[];
}

interface IPhoto {
  __typename: string;
  timestamp: number;
  uri: string;
}

interface IReaction {
  __typename: string;
  actor: string;
  reaction: string;
}

export interface IGetMessages {
  messages: IMessage[];
}
