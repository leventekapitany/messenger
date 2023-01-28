<template>
  <div class="content-list">
    <div class="title">
      <span>Chats</span>
      <button @click="onAddClicked">
        <MaterialIcon :icon="state.adding ? 'remove' : 'add'" />
      </button>
    </div>
    <div class="links">
      <RouterLink
        v-for="[roomId, room] in Object.entries(userStore.rooms || [])"
        :key="roomId"
        :to="{ name: 'Room', params: { roomId } }"
      >
        <button class="content">
          <div class="header">
            <img
              src="https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
            />
          </div>
          <div class="body">
            <span>{{ room.name }}</span>
          </div>
        </button>
      </RouterLink>
    </div>
    <div v-if="state.adding" class="room-creator">
      <div class="header">
        <img
          src="https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
        />
      </div>
      <div class="body">
        <input
          ref="inputField"
          v-model="input"
          placeholder="Room name"
          @keyup.enter="onCreateRoom"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MaterialIcon from '@/components/MaterialIcon.vue';
import { useCreateRoomQuery } from '@/queries/room-queries';
import { useUserStore } from '@/stores/user-store';
import { onUpdated, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

const state = reactive({ adding: false });
const input = ref('');
const inputField = ref<HTMLInputElement | null>(null);

const createRoom = useCreateRoomQuery();

const userStore = useUserStore();
console.log(userStore.rooms);

function onAddClicked() {
  state.adding = !state.adding;
}

function onCreateRoom() {
  if (input.value) {
    createRoom.mutate({ name: input.value });
    createRoom.onDone(({ data }) => {
      state.adding = false;
      if (data?.createRoom) {
        userStore.addRoom(data.createRoom);
      }
    });
  }
}

onUpdated(() => {
  if (inputField.value) {
    inputField.value.focus();
  }
});
</script>

<style scoped lang="scss">
.content-list {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 12px;
  flex-flow: column;
  padding-top: 12px;

  .content {
    padding-right: 8px;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    .header {
      width: 70px;
    }

    .header,
    .body {
      display: grid;
      place-items: center;

      span {
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
      }
    }
  }

  a {
    all: unset;
    cursor: pointer;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    padding: 0 24px;

    button {
      display: grid;
      place-items: center;
      height: 24px;
      border: var(--border);
      padding: 0 4px;
      border-radius: 8px;

      span {
        font-size: 16px;
      }
    }
  }

  .room-creator {
    display: flex;
    gap: 16px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
  }

  img {
    height: 30px;
    border-radius: 8px;
  }
}
</style>
