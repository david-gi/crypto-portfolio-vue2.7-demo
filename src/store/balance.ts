import { fetch } from "./axios-base";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { BalanceRecord, JsonToBalances } from "@/models/balance";

type baseType = BalanceRecord;

export const useBalanceStore = defineStore("balance", () => {
  const currentAddress = ref<string>();
  const availableAddresses = ref<string[]>([]);
  const _balances = ref<baseType[]>([]);

  const balances = computed((): baseType[] => {
    const sums: baseType[] = Array<baseType>();
    _balances.value.filter((e: baseType) => {
      return currentAddress.value != undefined
        ? e.addr == currentAddress.value
        : true;
    })
      .forEach((bal: baseType) => {
        const assetName = bal.asset.tickerSymbol;
        const assetIndex = sums.findIndex(x => x.asset.tickerSymbol == assetName)
        if (assetIndex == -1) sums.push(bal)
        else {
          sums[assetIndex].asset.value += bal.asset.value;
          sums[assetIndex].conversion.value += bal.conversion.value;
        }
      });
    return sums;
  });

  const sumTotal = computed((): number => {
    return balances.value
      .map((bal: baseType): number => bal.conversion.value)
      .reduce((a, b): number => a + b, 0)
  });

  function fetchBalances() {
    const setter = (x: baseType[]) => _balances.value = x;
    fetch<baseType[]>("/balances", setter, JsonToBalances)
      .then(() => {
        const addrs = _balances.value.map((e: baseType) => e.addr);
        availableAddresses.value = Array.from(new Set(addrs).values());
      })
      .catch((error) => {
        console.log(error);
        return;
      });

  }

  return { currentAddress, availableAddresses, _balances, balances, sumTotal, fetchBalances };
});
