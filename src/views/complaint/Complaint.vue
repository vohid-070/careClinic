<script setup>
import ActiveList from "./ActiveList.vue";
import HistoryList from "./HistoryList.vue";
</script>

<template>
  <TabView>
    <TabPanel header="Актив мурожаатлар">
      <ActiveList />
    </TabPanel>
    <TabPanel header="Таклиф ва шикоятлар тарихи">
      <HistoryList />
    </TabPanel>
  </TabView>
</template>
