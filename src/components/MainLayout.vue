<template>
  <v-card width="100vw" class="rounded indigo darken-3 pa-1" elevation="20">
    <v-container fluid class="white--text pa-0 rounded" elevation="8">
      <v-parallax style="height: fit-content;" class="pa-3 rounded"
        src="https://i.pinimg.com/originals/7a/81/24/7a81240359e212d40a665222ff3d13aa.jpg">

        <v-row class="pl-2 pt-2" elevation="6">
          <h1>Crypto Portfolio</h1>
        </v-row>

        <v-row elevation="6">
          <v-col>
            <h2 class="h2 text-no-wrap">
              <small>Total:</small>
              ${{ FormatCurrency(sumTotal, 2) }}
            </h2>
          </v-col>
          <v-col>
            <div class="float-right">
              <v-select v-model="currentAddress" :items="availableAddresses" label=" Filter by Address" dark dense>
              </v-select>
            </div>
          </v-col>
        </v-row>
      </v-parallax>
    </v-container>

    <v-toolbar color="indigo darken-2" dark flat dense>
      <v-tabs slider-color="orange accent-4">
        <v-tab @click="currentTab = 'tab-balances'">
          Balances
        </v-tab>
        <v-tab @click="currentTab = 'tab-events'">
          Events
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="currentTab" class="pa-4">
      <v-tab-item value="tab-balances">
        <balances-table :rowData="balances" :sumTotal="sumTotal" />
      </v-tab-item>
      <v-tab-item value="tab-events">
        <events-table :rowData="events" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BalancesTable from "@/components/Tables/BalancesTable.vue";
import EventsTable from "@/components/Tables/EventsTable.vue";
import { FormatCurrency } from "@/helpers/common"
import { useBalanceStore } from "@/store/balance";
import { useEventStore } from "@/store/event";
import { storeToRefs } from "pinia";

const balanceStore = useBalanceStore();
const { currentAddress, availableAddresses, sumTotal, balances } = storeToRefs(balanceStore);
const eventStore = useEventStore();
const { events } = storeToRefs(eventStore);

const currentTab = ref("tab-balances");
</script>
