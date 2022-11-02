<template>
  <v-app>
    <v-main>
      <main-layout />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useBalanceStore } from "@/store/balance";
import { useEventStore } from "@/store/event";
import MainLayout from '@/components/MainLayout.vue';

const balanceStore = useBalanceStore();
const eventStore = useEventStore();

[].map(x => x + 1)

onBeforeMount(async () => {
  balanceStore.fetchBalances();
  eventStore.fetchEvents();
});
</script>
