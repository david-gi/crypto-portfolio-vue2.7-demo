import { fetch } from "./axios-base";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Event, Convert } from "@/models/event";
import { AddressGroup } from "@/models/common";

type baseType = Event;

export const useEventStore = defineStore("events", () => {
  const events = ref<Array<baseType>>();
  const filter = ref<(x: AddressGroup) => boolean>(x => true);

  function setFilter(addressFilter: (x: AddressGroup) => boolean) {
    filter.value = addressFilter;
  }

  const filteredEvents = computed((): any => {
    return events?.value?.filter(filter.value);
  });

  function fetchEvents() {
    const setter = (x: baseType[]) => events.value = x.filter(filter.value);
    fetch<baseType[]>("/events", setter, Convert)
      .catch((error) => {
        console.log(error);
      });
  }

  return { events, filteredEvents, setFilter, fetchEvents };
});
