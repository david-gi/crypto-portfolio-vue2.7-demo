<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody v-for="event in eventStore.filteredEvents" :key="event.addr">
        <tr v-for="rec in event.records" :key="event.addr + rec.datetime">
          <td>
            <small>{{ event.addr }}</small>
          </td>
          <td>
            <strong>{{ rec.type }}</strong>
          </td>
          <td class="text-no-wrap">
            {{ rec.record.asset.value }}
            <small><strong>{{ rec.record.asset.tickerSymbol }}</strong></small>
          </td>
          <td>
            <div v-if="rec.record.conversion.charSymbol?.isLeftSide" class="text-no-wrap">
              {{ rec.record.conversion.charSymbol?.symbol }}
              {{ FormatCurrency(rec.record.conversion.value, 2) }}
              <small><strong>{{ rec.record.conversion.tickerSymbol }}</strong></small>
            </div>
            <div v-else class="text-no-wrap">
              {{ FormatCurrency(rec.record.conversion.value, 2) }}
              {{ rec.record.conversion.charSymbol?.symbol }}
              <small><strong>{{ rec.record.conversion.tickerSymbol }}</strong></small>
            </div>
          </td>
          <td>
            {{ rec.datetime.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/main";
import { FormatCurrency } from "@/helpers/common"

const { eventStore } = useMainStore();
</script>
