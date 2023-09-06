<script setup>
import HospitalHistoryList from "./HospitalHistoryList.vue";
import HospitalListLive from "./HospitalListLive.vue";
import InfoList from "./InfoList.vue";
</script>

<template>
  <div>
    <TabView>
      <TabPanel header="Онлайн">
        <InfoList />
      </TabPanel>

      <TabPanel header="Даволанаётганлар">
        <HospitalListLive />
      </TabPanel>

      <TabPanel header="Даволаниш тарихи">
        <HospitalHistoryList />
      </TabPanel>
    </TabView>
  </div>
</template>
<style scoped></style>
