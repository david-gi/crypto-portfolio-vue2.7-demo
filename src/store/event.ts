import { fetch } from "./axios-base";
import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { EventRecord, JsonToEvents } from "@/models/event";
import { useBalanceStore } from "./balance";

type baseType = EventRecord;

export const useEventStore = defineStore("events", () => {
  const _events = ref<Array<baseType>>([]);

  const events = computed((): baseType[] => {
    const balanceStore = useBalanceStore();
    const { currentAddress } = storeToRefs(balanceStore);
    return _events.value
      .filter((e: baseType) => currentAddress?.value != undefined ? e.addr == currentAddress.value : true);
  });

  function fetchEvents() {
    const setter = (x: baseType[]) => _events.value = x;
    fetch<baseType[]>("/events", setter, JsonToEvents)
      .catch((error) => {
        console.log(error);
      });
  }

  return { _events, events, fetchEvents };
});
