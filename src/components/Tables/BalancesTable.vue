<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="balance in rowData" :key="balance.asset.tickerSymbol">
          <td class="text-no-wrap">
            <financial-value :value="balance.asset" />
          </td>
          <td>
            <financial-value :value="balance.conversion" />
          </td>
          <td>
            <strong>{{ ToFixed((balance.conversion.value / sumTotal) * 100, 1) }}%</strong>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script setup lang="ts">
import { ToFixed, FormatCurrency } from "@/helpers/common"
import { BalanceRecord } from "@/models/balance";
import FinancialValue from "@/components/Values/FinancialValue.vue"

defineProps<{ rowData: BalanceRecord[], sumTotal: number }>();
</script>
