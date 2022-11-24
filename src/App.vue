<template>
  <v-app>
    <v-main style="font-family:Carme, sans-serif;"
      :style="{ background: vuetify.framework.theme.themes[vuetify.framework.theme.dark ? 'dark' : 'light'].background }">
      <div
        style=" font-size: 2em; cursor: pointer; line-height:0.5em; padding: 4px; position: absolute; top:0; right:0; user-select: none;"
        @click="vuetify.framework.theme.dark = !vuetify.framework.theme.dark">
        ☼
      </div>
      <div class="pa-12">
        <main-layout />
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useBalanceStore } from "@/store/balance";
import { useEventStore } from "@/store/event";
import MainLayout from '@/components/MainLayout.vue';
import vuetify from "./plugins/vuetify";

const balanceStore = useBalanceStore();
const eventStore = useEventStore();

onBeforeMount(async () => {
  balanceStore.fetchBalances();
  eventStore.fetchEvents();
});
</script>