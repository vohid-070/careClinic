<script setup>
import { reactive, ref } from "vue";

const showDialog = ref(false);
const showEditDialog = ref(false);
const dataItem = ref();
const editItem = ref();
const header = ref();
const speciality = localStorage.getItem("speciality");

const items = reactive([
  {
    id: 1,
    full_name: "Шохрух Кимсанов",
    speciality: "Терапевт",
    date: "01.01.2023",
    status: false,
    anamnesis_morbi: "",
    recommendation: "",
    clinical_diagnosis_local: "",
    clinical_diagnosis_object: "",
    status_localis: "",
    department_inspection: "",
    anamnesis_vitae: "",
    patient_complaint: "",
  },
  {
    id: 2,
    full_name: "Камила Жураева",
    speciality: "Эндокринолог",
    date: "01.01.2023",
    status: false,
    anamnesis_morbi: "",
    recommendation: "",
    clinical_diagnosis_local: "",
    clinical_diagnosis_object: "",
    status_localis: "",
    department_inspection: "",
    anamnesis_vitae: "",
    patient_complaint: "",
  },
  {
    id: 3,
    full_name: "Алишер Узоков",
    speciality: "Уролог",
    date: "01.01.2023",
    status: true,
    patient_complaint:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",

    status_localis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    department_inspection:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_vitae:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_morbi:
      "С начала июля месяца у меня начались проблемы с пищеварением, сильные боли в животе и частые расстройства желудка. В связи с этим, я обратилась в вашу клинику для получения медицинской помощи. После проведения осмотра врачом-терапевтом, мне были назначены определенные анализы и УЗИ органов брюшной полости.\
Однако, на момент написания этой жалобы прошло уже более трех недель, и я до сих пор не получила результатов анализов и УЗИ. Такая длительная задержка в получении результатов вызывает у меня серьезное беспокойство. Мои симптомы не только не улучшаются, но и ухудшаются, и я не могу получить ясную картину о том, что происходит с моим здоровьем.",
    recommendation:
      "Принимайте назначенные антисекреторные препараты и противовоспалительные средства в соответствии с указаниями врача. Постарайтесь придерживаться рекомендованных доз и графика приема.\
      Соблюдайте диету, которую вам рекомендовал врач. Избегайте острой, жирной, кислой и алкогольной пищи, так как они могут усугубить симптомы. Предпочитайте легко усваиваемые продукты, богатые витаминами и минералами.",
    clinical_diagnosis_local:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
    clinical_diagnosis_object:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
  },
  {
    id: 4,
    full_name: "Алишер Файзуллаев",
    speciality: "Дерматолог",
    date: "01.01.2023",
    status: true,
    patient_complaint:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",

    status_localis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    department_inspection:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_vitae:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_morbi:
      "С начала июля месяца у меня начались проблемы с пищеварением, сильные боли в животе и частые расстройства желудка. В связи с этим, я обратилась в вашу клинику для получения медицинской помощи. После проведения осмотра врачом-терапевтом, мне были назначены определенные анализы и УЗИ органов брюшной полости.\
Однако, на момент написания этой жалобы прошло уже более трех недель, и я до сих пор не получила результатов анализов и УЗИ. Такая длительная задержка в получении результатов вызывает у меня серьезное беспокойство. Мои симптомы не только не улучшаются, но и ухудшаются, и я не могу получить ясную картину о том, что происходит с моим здоровьем.",
    recommendation:
      "Принимайте назначенные антисекреторные препараты и противовоспалительные средства в соответствии с указаниями врача. Постарайтесь придерживаться рекомендованных доз и графика приема.\
      Соблюдайте диету, которую вам рекомендовал врач. Избегайте острой, жирной, кислой и алкогольной пищи, так как они могут усугубить симптомы. Предпочитайте легко усваиваемые продукты, богатые витаминами и минералами.",
    clinical_diagnosis_local:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
    clinical_diagnosis_object:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
  },
  {
    id: 5,
    full_name: "Сардор Рахимхон",
    speciality: "Психиатр",
    date: "01.01.2023",
    status: true,
    patient_complaint:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",

    status_localis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    department_inspection:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_vitae:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_morbi:
      "С начала июля месяца у меня начались проблемы с пищеварением, сильные боли в животе и частые расстройства желудка. В связи с этим, я обратилась в вашу клинику для получения медицинской помощи. После проведения осмотра врачом-терапевтом, мне были назначены определенные анализы и УЗИ органов брюшной полости.\
Однако, на момент написания этой жалобы прошло уже более трех недель, и я до сих пор не получила результатов анализов и УЗИ. Такая длительная задержка в получении результатов вызывает у меня серьезное беспокойство. Мои симптомы не только не улучшаются, но и ухудшаются, и я не могу получить ясную картину о том, что происходит с моим здоровьем.",
    recommendation:
      "Принимайте назначенные антисекреторные препараты и противовоспалительные средства в соответствии с указаниями врача. Постарайтесь придерживаться рекомендованных доз и графика приема.\
      Соблюдайте диету, которую вам рекомендовал врач. Избегайте острой, жирной, кислой и алкогольной пищи, так как они могут усугубить симптомы. Предпочитайте легко усваиваемые продукты, богатые витаминами и минералами.",
    clinical_diagnosis_object:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
    clinical_diagnosis_local:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
  },
  {
    id: 6,
    full_name: "Хуршид Комилов",
    speciality: "Ортопед",
    date: "01.01.2023",
    status: true,
    patient_complaint:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",

    status_localis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    department_inspection:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_vitae:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_morbi:
      "С начала июля месяца у меня начались проблемы с пищеварением, сильные боли в животе и частые расстройства желудка. В связи с этим, я обратилась в вашу клинику для получения медицинской помощи. После проведения осмотра врачом-терапевтом, мне были назначены определенные анализы и УЗИ органов брюшной полости.\
Однако, на момент написания этой жалобы прошло уже более трех недель, и я до сих пор не получила результатов анализов и УЗИ. Такая длительная задержка в получении результатов вызывает у меня серьезное беспокойство. Мои симптомы не только не улучшаются, но и ухудшаются, и я не могу получить ясную картину о том, что происходит с моим здоровьем.",
    recommendation:
      "Принимайте назначенные антисекреторные препараты и противовоспалительные средства в соответствии с указаниями врача. Постарайтесь придерживаться рекомендованных доз и графика приема.\
      Соблюдайте диету, которую вам рекомендовал врач. Избегайте острой, жирной, кислой и алкогольной пищи, так как они могут усугубить симптомы. Предпочитайте легко усваиваемые продукты, богатые витаминами и минералами.",
    clinical_diagnosis_object:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
    clinical_diagnosis_local:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
  },
  {
    id: 7,
    full_name: "Зиёда Расулова",
    speciality: "Лор",
    date: "01.01.2023",
    status: true,
    patient_complaint:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",

    status_localis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    department_inspection:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_vitae:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_morbi:
      "С начала июля месяца у меня начались проблемы с пищеварением, сильные боли в животе и частые расстройства желудка. В связи с этим, я обратилась в вашу клинику для получения медицинской помощи. После проведения осмотра врачом-терапевтом, мне были назначены определенные анализы и УЗИ органов брюшной полости.\
Однако, на момент написания этой жалобы прошло уже более трех недель, и я до сих пор не получила результатов анализов и УЗИ. Такая длительная задержка в получении результатов вызывает у меня серьезное беспокойство. Мои симптомы не только не улучшаются, но и ухудшаются, и я не могу получить ясную картину о том, что происходит с моим здоровьем.",
    recommendation:
      "Принимайте назначенные антисекреторные препараты и противовоспалительные средства в соответствии с указаниями врача. Постарайтесь придерживаться рекомендованных доз и графика приема.\
      Соблюдайте диету, которую вам рекомендовал врач. Избегайте острой, жирной, кислой и алкогольной пищи, так как они могут усугубить симптомы. Предпочитайте легко усваиваемые продукты, богатые витаминами и минералами.",
    clinical_diagnosis_object:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
    clinical_diagnosis_local:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
  },
  {
    id: 8,
    full_name: "Расулова Алиев",
    speciality: "Офтальмолог",
    date: "01.01.2023",
    status: true,
    patient_complaint:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    status_localis:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    department_inspection:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_vitae:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, distinctio, mollitia sit ex fugit rerum nobis sed commodi vero suscipit laborum cupiditate asperiores consequuntur enim impedit eius sunt cumque nostrum?",
    anamnesis_morbi:
      "С начала июля месяца у меня начались проблемы с пищеварением, сильные боли в животе и частые расстройства желудка. В связи с этим, я обратилась в вашу клинику для получения медицинской помощи. После проведения осмотра врачом-терапевтом, мне были назначены определенные анализы и УЗИ органов брюшной полости.\
Однако, на момент написания этой жалобы прошло уже более трех недель, и я до сих пор не получила результатов анализов и УЗИ. Такая длительная задержка в получении результатов вызывает у меня серьезное беспокойство. Мои симптомы не только не улучшаются, но и ухудшаются, и я не могу получить ясную картину о том, что происходит с моим здоровьем.",
    recommendation:
      "Принимайте назначенные антисекреторные препараты и противовоспалительные средства в соответствии с указаниями врача. Постарайтесь придерживаться рекомендованных доз и графика приема.\
      Соблюдайте диету, которую вам рекомендовал врач. Избегайте острой, жирной, кислой и алкогольной пищи, так как они могут усугубить симптомы. Предпочитайте легко усваиваемые продукты, богатые витаминами и минералами.",
    clinical_diagnosis_object:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
    clinical_diagnosis_local:
      "Симптомы пациента, такие как боли в области желудка, частые расстройства желудка и дополнительные анализы, включая гастроскопию, свидетельствуют о наличии язвенной болезни желудка. На гастроскопическом исследовании выявлено язвенное поражение слизистой оболочки желудка в области 12-перстной кишки.",
  },
]);

const viewDialog = ref(false);
const viewItem = ref();
const viewDetail = (item) => {
  viewItem.value = item;
  viewDialog.value = true;
};

const urlDev = ref("http://178.218.207.110:9002");
const resultPatient = reactive({
  MSKT: [
    {
      id: 1069,
      name: "MKSTPylZQsIN.pdf",
      created: "2023-08-17",
    },
  ],
  MRT: [
    {
      id: 1068,
      name: "MRTbhmQDgSI.pdf",
      created: "2023-08-17",
    },
  ],
  ANALIZ: [
    {
      id: 1071,
      name: "ANALIZiIWAtAnP.pdf",
      created: "2023-08-17",
    },
  ],
  RENTGEN: [
    {
      id: 1070,
      name: "RENTGENMxPGsKkD.pdf",
      created: "2023-08-17",
    },
  ],
});
</script>

<template>
  <div class="grid mb-2">
    <div class="col-12">
      <div class="p-4 card">
        <div class="flex gap-4 flex-wrap align-items-center">
          <i class="pi pi-user" style="font-size: 48px" />
          <b style="font-size: 20px">Жавлон Анваров</b>
        </div>
        <Divider />
        <div class="flex flex-wrap gap-8">
          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">Пол</p>
            <b>Эркак</b>
          </div>
          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">Дата рождения</p>
            <b>27.03.1994</b>
          </div>
          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">
              Номер телефона
            </p>
            <b>+998931234567</b>
          </div>

          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">Область</p>
            <b>Тошкент ш.</b>
          </div>
          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">Адрес</p>
            <b>Қоратош</b>
          </div>
          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">Группа крови</p>
            <b>2</b>
          </div>
          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">Вес</p>
            <b>80(кг)</b>
          </div>
          <div>
            <p class="p-0 mb-0" style="color: var(--gray-500)">Рост</p>
            <b>1.77(м)</b>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="showDialog"
    :header="header"
    modal
    style="width: 35vw"
  >
    <p v-for="text in dataItem.text">
      {{ text.subtext }}
    </p>
  </Dialog>
  <Dialog
    v-model:visible="showEditDialog"
    :header="header"
    modal
    style="width: 35vw"
  >
    <div v-for="text in editItem">
      <Textarea v-model="text.subtext" rows="3" class="w-full" />
    </div>
    <div class="flex justify-content-end mt-2">
      <Button label="Янгилаш" @click="showEditDialog = false" />
    </div>
  </Dialog>

  <DataView :value="items" paginator :rows="6">
    <template #list="slotProps">
      <div class="col-12 md:col-2">
        <div class="card m-3">
          <div class="flex flex-wrap align-items-center gap-2">
            <Badge v-if="slotProps.data.status == true" severity="success" />
            <Badge v-if="slotProps.data.status == false" severity="danger" />
            <b style="font-size: 16px">{{ slotProps.data.speciality }}</b>
          </div>
          <div class="mt-4">
            <p class="p-0 mb-0" style="color: var(--gray-500)">Врач</p>
            <b>{{ slotProps.data.full_name }}</b>
          </div>
          <div class="mt-4">
            <p class="p-0 mb-0" style="color: var(--gray-500)">Дата</p>
            <b>{{ slotProps.data.date }}</b>
          </div>
          <div class="flex justify-content-center mt-5">
            <Button
              label="Подробно"
              :disabled="!slotProps.data.status"
              @click="viewDetail(slotProps.data)"
            />
          </div>
        </div>
      </div>
    </template>
  </DataView>
  <Dialog v-model:visible="viewDialog" modal style="width: 45vw">
    <div>
      <div class="mb-4">
        <h4 class="mb-1">Анамнесис morbi</h4>
        <p>{{ viewItem.anamnesis_morbi }}</p>
      </div>
      <div class="mb-4">
        <h4 class="mb-1">Анамнесис vitae</h4>
        <p>{{ viewItem.anamnesis_vitae }}</p>
      </div>
      <div class="mb-4">
        <h4 class="mb-1">Осмотр в отделении</h4>
        <p>{{ viewItem.department_inspection }}</p>
      </div>
      <div class="mb-4">
        <h4 class="mb-1">Статус localis</h4>
        <p>{{ viewItem.status_localis }}</p>
      </div>
      <div class="mb-4">
        <h4 class="mb-1">Жалоба пациента</h4>
        <p>{{ viewItem.patient_complaint }}</p>
      </div>
      <div class="mb-4">
        <h4 class="mb-1">
          Обоснование клинического диагноза предоперационный эпикриз
        </h4>
        <div>
          <h5 class="mt-3 mb-0">Объективно:</h5>
          <p>
            {{ viewItem.clinical_diagnosis_object }}
            <a href="https://icd.who.int/browse11/l-m/ru" target="_blank">
              Подробно
              <i class="pi pi-arrow-up-right" />
            </a>
          </p>
        </div>
        <div>
          <h5 class="mt-3 mb-0">Локально:</h5>
          <p>
            {{ viewItem.clinical_diagnosis_local }}
            <a href="https://icd.who.int/browse11/l-m/ru" target="_blank">
              Подробно
              <i class="pi pi-arrow-up-right" />
            </a>
          </p>
        </div>
      </div>
      <div>
        <h4 class="mb-1">Рекомендации доктора:</h4>
        <p>{{ viewItem.recommendation }}</p>
      </div>
      <div class="my-3 flex justify-content-end">
        <Button
          class="ml-2"
          severity="danger"
          icon="pi pi-file-pdf"
          label="PDF"
        />
      </div>
    </div>
  </Dialog>

  <div
    v-if="resultPatient"
    class="card mt-4 flex flex-wrap justify-content-around files"
  >
    <ul>
      <p style="font-weight: bold">МСКТ</p>
      <li
        v-for="mskt in resultPatient.MSKT"
        :key="mskt"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${mskt.name}`" target="_blank">{{
          mskt.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(mskt.id)"
        />
      </li>
    </ul>
    <ul>
      <p style="font-weight: bold">МРТ</p>
      <li
        v-for="mrt in resultPatient.MRT"
        :key="mrt"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${mrt.name}`" target="_blank">{{
          mrt.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(mrt.id)"
        />
      </li>
    </ul>
    <ul>
      <p style="font-weight: bold">АНАЛИЗ</p>
      <li
        v-for="analiz in resultPatient.ANALIZ"
        :key="analiz"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${analiz.name}`" target="_blank">{{
          analiz.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(analiz.id)"
        />
      </li>
    </ul>
    <ul>
      <p style="font-weight: bold">РЕНТГЕН</p>
      <li
        v-for="rentgen in resultPatient.RENTGEN"
        :key="rentgen"
        class="flex flex-wrap gap-3"
      >
        <a :href="`${urlDev}/hospital/${rentgen.name}`" target="_blank">{{
          rentgen.created
        }}</a>
        <Button
          icon="pi pi-times"
          severity="danger"
          outlined
          v-if="role == 'ADMIN' || role == 'LABORATORY'"
          @click="deleteFile(rentgen.id)"
        />
      </li>
    </ul>
  </div>

  <div class="card mt-4">
    <form ref="form">
      <div class="grid">
        <div class="col-12 md:col-6">
          <h5 class="mb-0">Anamnesis morbi</h5>
          <Textarea rows="4" class="w-full" />
        </div>
        <div class="col-12 md:col-6">
          <h5 class="mb-0">Anamnesis vitae</h5>
          <Textarea rows="4" class="w-full" />
        </div>
        <div class="col-12 md:col-6">
          <h5 class="mb-0">Осмотр в отделении</h5>
          <Textarea rows="4" :disabled="serviced" class="w-full" />
        </div>
        <div class="col-12 md:col-6">
          <h5 class="mb-0">Status localis</h5>
          <Textarea rows="4" class="w-full" />
        </div>
      </div>
      <div class="grid">
        <div class="col-12">
          <h5 class="mb-0">Жалобы пациента</h5>
          <Textarea rows="3" class="w-full" />
        </div>
        <div class="col-12">
          <h5 class="mb-0">
            Обоснование клинического диагноза предоперационный эпикриз
            <a href="https://icd.who.int/browse11/l-m/ru" target="_blank">
              MKB 11
              <i class="pi pi-arrow-up-right" />
            </a>
          </h5>
          <h6 class="mb-1">Объективно</h6>
          <Textarea rows="3" class="w-full" />
          <h6 class="mb-1">Локально</h6>
          <Textarea rows="3" class="w-full" />
        </div>
        <div class="col-12">
          <h5 class="mb-0">Рекомендации {{ speciality }}а</h5>
          <Textarea rows="3" class="w-full" />
        </div>
      </div>
      <div class="flex justify-content-end mt-2">
        <Button label="Сохранить" :loading="loadingSave" @click="save" />
      </div>
    </form>
  </div>
</template>

<style>
.files ul li {
  list-style: none;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.files ul {
  border-right: 1px solid var(--gray-600);
  width: 25%;
  padding: 0;
}
.files ul:last-child {
  border: none;
}
.files p {
  text-align: center;
}
.files li a {
  border: 1px solid var(--primary-600);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  color: var(--black-900);
}
.files li a:hover {
  background-color: var(--primary-600);
  color: white;
}
</style>
