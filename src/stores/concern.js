import { defineStore } from "pinia";
import ConcernService from "@/services/concern.service";

export const useConcernStore = defineStore("concern", {
  state: () => ({
    concern: [],
    concernAllList: [],
    comentById: [],
  }),
  actions: {
    async ConcernActive(param, page) {
      const concernActive = await ConcernService.getConcernActiveList(
        param,
        page
      );
      this.concern = concernActive.object;
      return concernActive;
    },
    async ConcernAll(param, page) {
      const concernAll = await ConcernService.getConcernAllList(param, page);
      this.concernAllList = concernAll.object;
      return concernAll;
    },
    async GetConcernById(id) {
      const coment = await ConcernService.getCommentsById(id);
      this.comentById = coment.object;
      return coment;
    },
    async servicedConcern(id, message) {
      const serviced = await ConcernService.servicedConcern(id, message);
      return serviced;
    },
  },
});
