<template>
  <v-simple-table dense>
    <template v-slot:default>
      <tbody>
        <tr v-for="value in rowData" :key="value.addr + value.datetime">
          <td>
            <small>{{ value.addr }}</small>
          </td>
          <td>
            <strong>{{ value.type }}</strong>
          </td>
          <td class="text-no-wrap">
            <financial-value :value="value.record.asset" />
          </td>
          <td class="text-no-wrap">
            <financial-value :value="value.record.conversion" />
          </td>
          <td>
            {{ value.datetime.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script setup lang="ts">
import { EventRecord } from "@/models/event";
import FinancialValue from "@/components/Values/FinancialValue.vue"

defineProps<{ rowData: EventRecord[] }>();
</script>
