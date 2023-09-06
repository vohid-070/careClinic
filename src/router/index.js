import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "/",
          name: "patient-list",
          component: () => import("@/views/patient/PatientList.vue"),
        },
        {
          path: "/patient/detail/:id",
          name: "patient-detail",
          component: () => import("@/views/patient/PatientDetail.vue"),
          props: true,
        },
        {
          path: "/employee/list",
          name: "employee-list",
          component: () => import("@/views/employee/EmployeeList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/external/employee/list",
          name: "external-employee-list",
          component: () =>
            import("@/views/external-employee/ExternalEmployeeList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/directory/list",
          name: "directory-list",
          component: () => import("@/views/employeeCRUD/DirectoryList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/level/list",
          name: "level-list",
          component: () => import("@/views/employeeCRUD/LevelList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/stage/list",
          name: "stage-list",
          component: () => import("@/views/employeeCRUD/StageList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/room/list",
          name: "room-list",
          component: () => import("@/views/employeeCRUD/RoomList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/speciality/list",
          name: "speciality-list",
          component: () => import("@/views/employeeCRUD/SpecialityList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/transfer/list",
          name: "transfer-list",
          component: () => import("@/views/transfer/TransferList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/meeting/list",
          name: "meeting-list",
          component: () => import("@/views/meeting/MeetingList.vue"),
        },
        {
          path: "/form/list",
          name: "from-list",
          component: () => import("@/views/form/FormList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/form-speciality/list",
          name: "from-speciality-list",
          component: () =>
            import("@/views/form-speciality/FormSpecialityList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/employee/create",
          name: "employee-create",
          component: () => import("@/views/employee/EmployeeCreate.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
        },
        {
          path: "/employee/detail/:id",
          name: "employee-detail",
          component: () => import("@/views/employee/EmployeeDetail.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role != "ADMIN") {
              return next({ name: "notfound" });
            }

            return next();
          },
          props: true,
        },
        /* {
                    path: '/check/restore',
                    name: 'restore-check',
                    component: () => import('@/views/employeeCRUD/CheckRestore.vue')
                }, */
        {
          path: "/check/issue/:id",
          name: "check-issue",
          component: () => import("@/views/employeeCRUD/CheckIssue.vue"),
          props: true,
        },
        {
          path: "/meeting/create/:id",
          name: "meeting-create",
          component: () => import("@/views/meeting/MeetingCreate.vue"),
          props: true,
        },
        {
          path: "/paid/speciality",
          name: "paid-speciality",
          component: () => import("@/views/meeting/PaidSpeciality.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role == "DOCTOR" || role == "LABORATORY") {
              return next();
            }
            return next({ name: "notfound" });
          },
        },
        {
          path: "/cabinet/list",
          name: "cabinet-list",
          component: () => import("@/views/cabinet/CabinetList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (
              role != "ADMIN" ||
              role != "DIRECTOR" ||
              role != "RECEPTION_1" ||
              role != "RECEPTION_2"
            ) {
              return next();
            }

            return next({ name: "notfound" });
          },
        },
        {
          path: "/bed/list",
          name: "bed-list",
          component: () => import("@/views/bed/BedList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (
              role != "ADMIN" ||
              role != "DIRECTOR" ||
              role != "RECEPTION_1" ||
              role != "RECEPTION_2"
            ) {
              return next();
            }

            return next({ name: "notfound" });
          },
        },
        {
          path: "/hospital/list",
          name: "hospital-list",
          component: () => import("@/views/hospital/HospitalList.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (
              role != "ADMIN" ||
              role != "DIRECTOR" ||
              role != "RECEPTION_1" ||
              role != "RECEPTION_2"
            ) {
              return next();
            }

            return next({ name: "notfound" });
          },
        },
        {
          path: "/monitoring/statistics",
          name: "monitoring",
          component: () => import("@/views/monitoring/Monitoring.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role == "ADMIN" || role == "DIRECTOR") {
              return next();
            }

            return next({ name: "notfound" });
          },
        },
        {
          path: "/monitoring/employee",
          name: "monitoring-employee",
          component: () => import("@/views/monitoring/Employee.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role == "ADMIN" || role == "DIRECTOR") {
              return next();
            }

            return next({ name: "notfound" });
          },
        },
        {
          path: "/monitoring/external-employee",
          name: "monitoring-external-employee",
          component: () => import("@/views/monitoring/ExternalEmployee.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role == "ADMIN" || role == "DIRECTOR") {
              return next();
            }

            return next({ name: "notfound" });
          },
        },
        {
          path: "/meeting/list/pdf/generate/:id",
          name: "pdf-convert",
          component: () => import("@/views/meeting/PdfConvert.vue"),
          props: true,
        },
        {
          path: "/meeting/transfer/list/pdf/generate/:id",
          name: "transfer-pdf-convert",
          component: () => import("@/views/meeting/TransferPdfConvert.vue"),
          props: true,
        },
        {
          path: "/my/info",
          name: "my-info",
          component: () => import("@/views/my-info/MyInfo.vue"),
        },
        {
          path: "/category/list",
          name: "category-list",
          component: () => import("@/views/category/CategoryList.vue"),
        },
        {
          path: "/hospital/medicament",
          name: "hospital-medicament",
          component: () => import("@/views/monitoring/HospitalMedicament.vue"),
        },
        {
          path: "/medicament/list",
          name: "medicament-list",
          component: () => import("@/views/medicament/MedicamentCrud.vue"),
        },
        {
          path: "/call-back",
          name: "call-back",
          component: () => import("@/views/call-back/CallBack.vue"),
        },
        {
          path: "/complaint",
          name: "complaint",
          component: () => import("@/views/complaint/Complaint.vue"),
        },
        {
          path: "/concern",
          name: "concern",
          component: () => import("@/views/concern/Concern.vue"),
        },
        {
          path: "/time/table",
          name: "time-table",
          component: () => import("@/views/timeTable/TimeTable.vue"),
        },
        {
          path: "/mobile/laboratory",
          name: "mobile-laboratory",
          component: () =>
            import("@/views/mobileLabaratory/MobileLaboratory.vue"),
        },
        {
          path: "/ambulance",
          name: "ambulance",
          component: () => import("@/views/ambulance/Ambulance.vue"),
        },
        {
          path: "/storage/medicament",
          name: "storage-medicament",
          component: () =>
            import("@/views/storage-medicament/StorageMedicament.vue"),
        },
        {
          path: "/information-form",
          name: "information-form",
          component: () =>
            import("@/views/informationForm/InformationForm.vue"),
          beforeEnter: async (to, from, next) => {
            const role = localStorage.getItem("user");
            if (role == "DOCTOR") {
              return next();
            }

            return next({ name: "notfound" });
          },
        },
      ],
    },

    {
      path: "/auth/login",
      name: "login",
      component: () => import("@/views/pages/auth/Login.vue"),
    },
    {
      path: "/pages/notfound",
      name: "notfound",
      component: () => import("@/views/pages/NotFound.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/pages/notfound",
    },

    /* {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        } */
  ],
});

export default router;
