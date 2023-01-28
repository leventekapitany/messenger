export default /* GraphQL */ `
  type Reaction {
    reaction: String
    actor: String
  }

  input GifInput {
    uri: String
  }

  input ThumbnailInput {
    uri: String
  }

  input AudioInput {
    uri: String
    creation_timestamp: Float
  }

  input ShareInput {
    link: String
    share_text: String
  }

  input ReactionInput {
    reaction: String
    actor: String
  }

  input VideoInput {
    uri: String
    creation_timestamp: Float
    thumbnail: ThumbnailInput
  }

  input FileInput {
    uri: String
    creation_timestamp: Float
  }

  input StickerInput {
    uri: String
  }

  input FbPhoto {
    uri: String
    creation_timestamp: Float
  }

  input IntervalInput {
    from: Float
    to: Float
  }

  type Photo {
    uri: String
    timestamp: Float
  }

  input PhotoInput {
    uri: String
    timestamp: Float
  }

  type Message {
    content: String
    timestamp: Float
    timestampISO: String
    sender: ID
    photos: [Photo]
    reactions: [Reaction]
    migrated: Boolean
    roomId: ID
  }

  input MessageInput {
    content: String
    photos: [PhotoInput]
    roomId: ID!
  }

  input FbMessage {
    sender_name: String
    timestamp_ms: Float
    content: String
    reactions: [ReactionInput]
    photos: [FbPhoto]
    gifs: [GifInput]
    share: ShareInput
    call_duration: Float
    is_unsent: Boolean
    videos: [VideoInput]
    files: [FileInput]
    migrated: Boolean
    audio_files: [AudioInput]
    sticker: StickerInput
    missed: Boolean
    ip: String
  }

  input RoomUserInput {
    userId: ID!
    name: String
  }

  type RoomUser {
    userId: ID
    name: String
  }

  type Room {
    roomId: ID!
    users: [RoomUser]
    name: String
  }

  type User {
    userId: ID
    rooms: [ID]
  }

  type Query {
    messages(interval: IntervalInput, limit: Int!, roomId: ID!): [Message]
    room(roomId: ID!): Room
    rooms: [Room]
    users(searchText: String!): [User]
  }

  type Mutation {
    migrateMessages(messages: [FbMessage]): [Message]
    createRoom(name: String): Room
    sendMessage(message: MessageInput): Message
  }
`;
