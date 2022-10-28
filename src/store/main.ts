import { defineStore } from "pinia";
import { ref } from "vue";
import { AddressGroup } from "@/models/common";
import { useEventStore } from './event'
import { useBalanceStore } from './balance'

const event = useEventStore();
const balance = useBalanceStore();

export const useMainStore = defineStore("main", () => {
  const currentAddress = ref<string>();

  function setAddress(addr: string | undefined) {
    currentAddress.value = addr;
    event.fetchEvents();
    balance.fetchBalances();
  }

  function addressFilter(x: AddressGroup) {
    currentAddress.value != undefined
      ? x.addr == currentAddress.value
      : true
  }

  return { currentAddress, setAddress, addressFilter };
});
