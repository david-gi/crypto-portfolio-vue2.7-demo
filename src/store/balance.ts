import { fetch } from "./axios-base";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Balance, BalanceRecord, Convert } from "@/models/balance";
import { AddressGroup } from "@/models/common";
import { ToFixed } from "@/helpers/common"

type baseType = Balance;

export const useBalanceStore = defineStore("balance", () => {
  const balances = ref<baseType[]>();
  const filter = ref<(x: AddressGroup) => boolean>(x => true);

  const collapsedBalances = computed((): BalanceRecord[] => {
    const res: BalanceRecord[] = [];
    balances.value?.filter(filter.value).forEach(bal => {
      bal.records.forEach(rec => {
        const assetName = rec.asset.tickerSymbol;
        const assetIndex = res.findIndex(x => x.asset.tickerSymbol == assetName)
        if (assetIndex == -1) {
          res.push(rec)
        } else {
          res[assetIndex].asset.value = ToFixed(res[assetIndex].asset.value, 4) + ToFixed(rec.asset.value, 4);
          res[assetIndex].conversion.value = ToFixed(res[assetIndex].conversion.value, 4) + ToFixed(rec.conversion.value, 4);
        }
      });
    })
    return res;
  });

  const sumTotal = computed((): number => {
    if (balances.value == undefined) return 0;
    else return balances.value.filter(filter.value)
      .map((bal): number => bal.records
        .map((balRec): number => ToFixed(balRec.conversion.value, 2))
        .reduce((a: number, b: number): number => a + b))
      .reduce((a: number, b: number): number => a + b);
  });

  function setFilter(addressFilter: (x: AddressGroup) => boolean) {
    filter.value = addressFilter;
  }

  function fetchBalances() {
    const setter = (x: baseType[]) => balances.value = x;
    fetch<baseType[]>("/balances", setter, Convert).catch((error) => {
      console.log(error);
    });
  }

  return { balances, collapsedBalances, sumTotal, setFilter, fetchBalances };
});
