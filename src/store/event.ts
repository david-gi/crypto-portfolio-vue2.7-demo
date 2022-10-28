import { fetch } from "./axios-base";
import { defineStore } from "pinia";
import { ref } from "vue";
import { Event, Convert } from "@/models/event";
import { useMainStore } from './main'

type baseType = Event;
const main = useMainStore();

export const useEventStore = defineStore("events", () => {
  const events = ref<Array<baseType>>();

  function fetchEvents() {
    const setter = (x: baseType[]) => events.value = x.filter(main.addressFilter);
    fetch<baseType[]>("/events", setter, Convert)
      .catch((error) => {
        console.log(error);
      });
  }

  return { events, fetchEvents };
});
