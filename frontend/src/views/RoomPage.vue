<template>
  <div id="room-page">
    <div class="title">
      <div class="top-bar-container">
        <button @click="userStore.showRouter = false">
          <MaterialIcon icon="arrow_back" />
        </button>
        <span> Name </span>
        <AddButton @change="onAdd" />
        <SearchUser v-if="state.isAdding" />
      </div>
    </div>
    <div v-if="loading" class="loading">
      <v-progress-linear color="primary" indeterminate></v-progress-linear>
    </div>
    <div
      ref="container"
      v-else-if="result && result.messages"
      class="container"
      :class="{ 'smooth-scroll': newMessageArrived }"
    >
      <div
        v-for="message in result.messages"
        :key="message.timestamp"
        class="message"
        :class="
          message.sender === userStore.userId
            ? 'message--right'
            : 'message--left'
        "
      >
        <MessageBubble
          :message="message"
          :received="message.sender !== userStore.userId"
        />
      </div>
    </div>
    <div class="input">
      <input
        v-model="input"
        placeholder="Message"
        @keyup.enter="onSendMessage"
      />

      <button @click="onSendMessage"><SendIcon /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SendIcon from '@/assets/icons/send.svg?component';
import AddButton from '@/components/AddButton.vue';
import MaterialIcon from '@/components/MaterialIcon.vue';
import MessageBubble from '@/components/MessageBubble.vue';
import SearchUser from '@/components/SearchUser.vue';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '@/queries/message-queries';
import { useUserStore } from '@/stores/user-store';

import { onUpdated, reactive, ref, watch } from 'vue';

console.log('roompage init');

const { roomId } = defineProps({
  roomId: { type: String, required: true },
});

const userStore = useUserStore();

let { loading, result } = useGetMessagesQuery({
  limit: 50,
  roomId,
});
const { mutate } = useSendMessageMutation();

onUpdated(() => {
  scrollToBottom();
});

const state = reactive({
  isAdding: false,
});

console.log(state.isAdding);

function onAdd(adding: boolean) {
  state.isAdding = adding;
}

watch(result, (_, messagesBefore) => {
  newMessageArrived.value = !!messagesBefore;
});

function scrollToBottom() {
  container.value.scrollTop = container.value.scrollHeight;
}

const container = ref<HTMLDivElement>(HTMLDivElement.prototype);
const input = ref('');
const newMessageArrived = ref(false);

function onSendMessage() {
  mutate({ message: { content: input.value, roomId } });
  input.value = '';
}
</script>

<style scoped lang="scss">
#room-page {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.input,
.title {
  height: 50px;
}
.container {
  display: flex;
  flex-flow: column;
  gap: 12px;
  height: calc(100% - 100px);
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 12px;
  .message {
    display: flex;
    flex-direction: column;
    &--right {
      align-items: flex-end;
    }
    &--left {
      align-items: flex-start;
    }
  }
}

.top-bar-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 12px;
  gap: 24px;
}

.title {
  border-bottom: var(--border);
}

.input {
  border-top: var(--border);
  margin-top: auto;
  display: flex;
  padding-right: 25px;
}

input {
  padding: 4px;
  padding-left: 12px;
  width: 100%;
}

input:focus-visible {
  outline: unset;
}

.input button {
  display: grid;
  place-items: center;
  width: 50px;
}

.smooth-scroll {
  scroll-behavior: smooth;
}
</style>
