import { fetch } from "./axios-base";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Balance, Convert } from "@/models/balance";
import { useMainStore } from './main'

type baseType = Balance;
const main = useMainStore();

export const useBalanceStore = defineStore("balance", () => {
  const balances = ref<baseType[]>();

  const sumTotal = computed((): number => {
    var total: number = 0;
    balances.value?.filter(main.addressFilter).forEach((x) => total += x.records
      .reduce((a, b) => {
        a.conversion.value += b.conversion.value;
        return a;
      }).conversion.value)
    return total;
  });

  function fetchBalances() {
    const setter = (x: baseType[]) => balances.value = x.filter(main.addressFilter);
    fetch<baseType[]>("/balances", setter, Convert).catch((error) => {
      console.log(error);
    });
  }

  return { balances, sumTotal, fetchBalances };
});
