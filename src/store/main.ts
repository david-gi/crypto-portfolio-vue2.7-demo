import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useEventStore } from "@/store/event";
import { useBalanceStore } from "@/store/balance";
import { AddressGroup } from "@/models/common";

export const useMainStore = defineStore("main", () => {
  const currentAddress = ref<string>();
  const eventStore = ref(useEventStore());
  const balanceStore = ref(useBalanceStore());

  function availableAddresses() {
    const eventAddrs = eventStore.value.events?.map(e => e.addr);
    const balanceAddrs = balanceStore.value.balances?.map(e => e.addr);
    const addrs = (eventAddrs != undefined ? eventAddrs : []).concat(balanceAddrs != undefined ? balanceAddrs : []);
    return Array.from(new Set(addrs).values());
  }

  function setAddress(addr: string | undefined) {
    currentAddress.value = addr;
    const addressFilter = addr == undefined
      ? (x: AddressGroup) => true
      : (x: AddressGroup) => x.addr == addr
    eventStore.value.setFilter(addressFilter);
    balanceStore.value.setFilter(addressFilter);
  }

  return { currentAddress, availableAddresses, eventStore, balanceStore, setAddress };
});
