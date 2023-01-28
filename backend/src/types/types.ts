import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AudioInput = {
  creation_timestamp?: InputMaybe<Scalars['Float']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type FbMessage = {
  audio_files?: InputMaybe<Array<InputMaybe<AudioInput>>>;
  call_duration?: InputMaybe<Scalars['Float']>;
  content?: InputMaybe<Scalars['String']>;
  files?: InputMaybe<Array<InputMaybe<FileInput>>>;
  gifs?: InputMaybe<Array<InputMaybe<GifInput>>>;
  ip?: InputMaybe<Scalars['String']>;
  is_unsent?: InputMaybe<Scalars['Boolean']>;
  migrated?: InputMaybe<Scalars['Boolean']>;
  missed?: InputMaybe<Scalars['Boolean']>;
  photos?: InputMaybe<Array<InputMaybe<FbPhoto>>>;
  reactions?: InputMaybe<Array<InputMaybe<ReactionInput>>>;
  sender_name?: InputMaybe<Scalars['String']>;
  share?: InputMaybe<ShareInput>;
  sticker?: InputMaybe<StickerInput>;
  timestamp_ms?: InputMaybe<Scalars['Float']>;
  videos?: InputMaybe<Array<InputMaybe<VideoInput>>>;
};

export type FbPhoto = {
  creation_timestamp?: InputMaybe<Scalars['Float']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type FileInput = {
  creation_timestamp?: InputMaybe<Scalars['Float']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type GifInput = {
  uri?: InputMaybe<Scalars['String']>;
};

export type IntervalInput = {
  from?: InputMaybe<Scalars['Float']>;
  to?: InputMaybe<Scalars['Float']>;
};

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  migrated?: Maybe<Scalars['Boolean']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  roomId?: Maybe<Scalars['ID']>;
  sender?: Maybe<Scalars['ID']>;
  timestamp?: Maybe<Scalars['Float']>;
  timestampISO?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  content?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<Array<InputMaybe<PhotoInput>>>;
  roomId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom?: Maybe<Room>;
  migrateMessages?: Maybe<Array<Maybe<Message>>>;
  sendMessage?: Maybe<Message>;
};


export type MutationCreateRoomArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationMigrateMessagesArgs = {
  messages?: InputMaybe<Array<InputMaybe<FbMessage>>>;
};


export type MutationSendMessageArgs = {
  message?: InputMaybe<MessageInput>;
};

export type Photo = {
  __typename?: 'Photo';
  timestamp?: Maybe<Scalars['Float']>;
  uri?: Maybe<Scalars['String']>;
};

export type PhotoInput = {
  timestamp?: InputMaybe<Scalars['Float']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  messages?: Maybe<Array<Maybe<Message>>>;
  room?: Maybe<Room>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryMessagesArgs = {
  interval?: InputMaybe<IntervalInput>;
  limit: Scalars['Int'];
  roomId: Scalars['ID'];
};


export type QueryRoomArgs = {
  roomId: Scalars['ID'];
};


export type QueryUsersArgs = {
  searchText: Scalars['String'];
};

export type Reaction = {
  __typename?: 'Reaction';
  actor?: Maybe<Scalars['String']>;
  reaction?: Maybe<Scalars['String']>;
};

export type ReactionInput = {
  actor?: InputMaybe<Scalars['String']>;
  reaction?: InputMaybe<Scalars['String']>;
};

export type Room = {
  __typename?: 'Room';
  name?: Maybe<Scalars['String']>;
  roomId: Scalars['ID'];
  users?: Maybe<Array<Maybe<RoomUser>>>;
};

export type RoomUser = {
  __typename?: 'RoomUser';
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['ID']>;
};

export type RoomUserInput = {
  name?: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
};

export type ShareInput = {
  link?: InputMaybe<Scalars['String']>;
  share_text?: InputMaybe<Scalars['String']>;
};

export type StickerInput = {
  uri?: InputMaybe<Scalars['String']>;
};

export type ThumbnailInput = {
  uri?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  rooms?: Maybe<Array<Maybe<Scalars['ID']>>>;
  userId?: Maybe<Scalars['ID']>;
};

export type VideoInput = {
  creation_timestamp?: InputMaybe<Scalars['Float']>;
  thumbnail?: InputMaybe<ThumbnailInput>;
  uri?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AudioInput: AudioInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  FbMessage: FbMessage;
  FbPhoto: FbPhoto;
  FileInput: FileInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GifInput: GifInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntervalInput: IntervalInput;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  Mutation: ResolverTypeWrapper<{}>;
  Photo: ResolverTypeWrapper<Photo>;
  PhotoInput: PhotoInput;
  Query: ResolverTypeWrapper<{}>;
  Reaction: ResolverTypeWrapper<Reaction>;
  ReactionInput: ReactionInput;
  Room: ResolverTypeWrapper<Room>;
  RoomUser: ResolverTypeWrapper<RoomUser>;
  RoomUserInput: RoomUserInput;
  ShareInput: ShareInput;
  StickerInput: StickerInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  ThumbnailInput: ThumbnailInput;
  User: ResolverTypeWrapper<User>;
  VideoInput: VideoInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AudioInput: AudioInput;
  Boolean: Scalars['Boolean'];
  FbMessage: FbMessage;
  FbPhoto: FbPhoto;
  FileInput: FileInput;
  Float: Scalars['Float'];
  GifInput: GifInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IntervalInput: IntervalInput;
  Message: Message;
  MessageInput: MessageInput;
  Mutation: {};
  Photo: Photo;
  PhotoInput: PhotoInput;
  Query: {};
  Reaction: Reaction;
  ReactionInput: ReactionInput;
  Room: Room;
  RoomUser: RoomUser;
  RoomUserInput: RoomUserInput;
  ShareInput: ShareInput;
  StickerInput: StickerInput;
  String: Scalars['String'];
  ThumbnailInput: ThumbnailInput;
  User: User;
  VideoInput: VideoInput;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  migrated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Photo']>>>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reaction']>>>, ParentType, ContextType>;
  roomId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestampISO?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createRoom?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, Partial<MutationCreateRoomArgs>>;
  migrateMessages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, Partial<MutationMigrateMessagesArgs>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, Partial<MutationSendMessageArgs>>;
};

export type PhotoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Photo'] = ResolversParentTypes['Photo']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'limit' | 'roomId'>>;
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'roomId'>>;
  rooms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Room']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'searchText'>>;
};

export type ReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  actor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reaction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['RoomUser']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoomUser'] = ResolversParentTypes['RoomUser']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  rooms?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Photo?: PhotoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomUser?: RoomUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

