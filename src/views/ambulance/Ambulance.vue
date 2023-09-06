<script setup>
import ActiveList from "./ActiveList.vue";
import HistoryList from "./HistoryList.vue";
</script>

<template>
  <div>
    <TabView>
      <TabPanel header="Актив мурожаатлар">
        <ActiveList />
      </TabPanel>
      <TabPanel header="Мурожаатлар тарихи">
        <HistoryList />
      </TabPanel>
    </TabView>
  </div>
</template>
