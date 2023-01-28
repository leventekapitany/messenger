import { FbMessage, Message } from './types/types.js';

function decode(s: string) {
  const decoder = new TextDecoder();
  const charCodes = s.split('').map(r => r.charCodeAt(0));
  return decoder.decode(new Uint8Array(charCodes));
}

export default {
  fbMessageToMessage: (fbMessage: FbMessage): Message => ({
    sender: decode(fbMessage.sender_name),
    timestamp: fbMessage.timestamp_ms,
    migrated: true,
    ...(fbMessage.content && { content: decode(fbMessage.content) }),
    ...(fbMessage.photos && { photos: fbMessage.photos }),
    ...(fbMessage.reactions && {
      reactions: fbMessage.reactions.map(fbReaction => ({
        actor: decode(fbReaction.actor),
        reaction: decode(fbReaction.reaction),
      })),
    }),
  }),
  decode,
};
