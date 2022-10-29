<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="balance in balanceStore.collapsedBalances" :key="balance.asset.value">
          <td class="text-no-wrap">
            {{ balance.asset.value }}
            <small><strong>{{ balance.asset.tickerSymbol }}</strong></small>
          </td>
          <td>
            <div v-if="balance.conversion.charSymbol?.isLeftSide" class="text-no-wrap">
              {{ balance.conversion.charSymbol?.symbol }}
              {{ FormatCurrency(balance.conversion.value, 2) }}
              <small><strong>{{ balance.conversion.tickerSymbol }}</strong></small>
            </div>
            <div v-else class="text-no-wrap">
              {{ FormatCurrency(balance.conversion.value, 2) }}
              {{ balance.conversion.charSymbol?.symbol }}
              <small><strong>{{ balance.conversion.tickerSymbol }}</strong></small>
            </div>
          </td>
          <td>
            <strong>{{ ToFixed((balance.conversion.value / balanceStore.sumTotal) * 100, 1) }}%</strong>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script setup lang="ts">
import { useMainStore } from "@/store/main";
import { FormatCurrency, ToFixed } from "@/helpers/common"

const { balanceStore } = useMainStore();
</script>
