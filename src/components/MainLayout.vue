<template>
  <v-card>
    <v-container class="blue darken-3 white--text" fluid>
      <v-row class="pt-2">
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
    </v-container>

    <v-toolbar color="blue darken-2" dark flat dense>
      <v-tabs slider-color="orange">
        <v-tab @click="currentTab = 'tab-balances'">
          Balances
        </v-tab>
        <v-tab @click="currentTab = 'tab-events'">
          Events
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="currentTab">
      <v-tab-item value="tab-balances">
        <balances-table :rowData="balances" :sumTotal="sumTotal" />
      </v-tab-item>
      <v-tab-item value="tab-events">
        <events-table :rowData="events" />
      </v-tab-item>
    </v-tabs-items>
    <v-container class="blue darken-3" fluid>
      <br />
      <br />
    </v-container>
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
