<template>
  <v-sheet
    rounded
    border
    max-width="60%"
    :color="received ? 'blue-lighten-5' : 'white'"
    class="sheet"
  >
    {{ message.content }}
    <div v-for="photo in message.photos" :key="photo.uri">*PHOTO*</div>

    <div
      v-for="reaction in message.reactions"
      :key="reaction.actor"
      class="reactions"
    >
      <v-chip size="small" variant="outlined">
        {{ reaction.reaction }}
      </v-chip>
    </div>

    <v-tooltip activator="parent" location="bottom">{{
      date.toLocaleTimeString('hu-HU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }}</v-tooltip>
  </v-sheet>
</template>

<script setup lang="ts">
import { IMessage } from '@/interfaces/message';

const props = defineProps({
  message: { type: Object as () => IMessage, required: true },
  received: { type: Boolean },
});

const date = new Date(props.message.timestampISO);
</script>

<style lang="scss" scoped>
.sheet {
  padding: 8px;
  word-break: break-word;
}
.reactions {
  display: flex;
  justify-content: flex-end;
}
</style>
