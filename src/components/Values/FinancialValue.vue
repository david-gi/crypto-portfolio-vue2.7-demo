<template>
  <div class="text-no-wrap">
    <span v-if="value.charSymbol?.isLeftSide">
      {{ value.charSymbol?.symbol }}
    </span>
    {{ FormatCurrency(value.value, 2) }}
    <small><strong>{{ value.tickerSymbol }}</strong></small>
    <span v-if="!value.charSymbol?.isLeftSide">
      {{ value.charSymbol?.symbol }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { FormatCurrency } from "../../helpers/common"
import { FinancialValue } from "../../models/common";

defineProps<{ value: FinancialValue }>();
</script>
