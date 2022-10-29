<template>
  <v-select :items="availableAddresses()" label=" Filter by Address" dark dense @change=setAddress>
  </v-select>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue"
import { useMainStore } from "@/store/main";

const { availableAddresses, setAddress } = useMainStore();

const instance = getCurrentInstance();
instance?.proxy?.$forceUpdate();
</script>
