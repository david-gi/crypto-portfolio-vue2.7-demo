<template>
  <v-app>
    <v-main>
      <main-layout />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useMainStore } from "@/store/main";
import MainLayout from '@/components/MainLayout.vue';

const mainStore = useMainStore();

onBeforeMount(async () => {
  mainStore.eventStore.fetchEvents();
  mainStore.balanceStore.fetchBalances();
});
</script>
