<template>
  <div></div>
</template>

<script setup lang="ts">
import { router } from '@/main';
import { useGetRoomsQuery } from '@/queries/room-queries';
import { useUserStore } from '@/stores/user-store';
import { watch } from 'vue';

const userStore = useUserStore();

const { result } = useGetRoomsQuery();

watch(result, () => {
  const rooms = result.value?.rooms || [];
  userStore.setRooms(rooms);

  router.replace({ name: 'Room', params: { roomId: userStore.firstRoomId } });
});
</script>
