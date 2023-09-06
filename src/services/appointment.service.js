import axios from "@/library/axios";

const AppointmentService = {
  async appointmentOwn() {
    const { data } = await axios.get("/api/v1/appointment/own");
    return data;
  },
  async appointmentEmployeeById(id) {
    const { data } = await axios.get(`/api/v1/appointment/employee/${id}`);
    return data;
  },
  async addAppointment(appointmentCredentials) {
    const data = await axios.post(
      "/api/v1/appointment/add",
      appointmentCredentials
    );
    return data;
  },
};
export default AppointmentService;
