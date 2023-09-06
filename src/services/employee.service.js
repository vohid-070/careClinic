import axios from "../library/axios";

const EmployeeService = {
  async getEmployeeBySpeciality(id) {
    const { data } = await axios.get("/api/v1/employee/by-speciality", {
      params: {
        id,
      },
    });
    return data;
  },
  async getEmployeeList(page, param) {
    const data = await axios.get("/api/v1/employee/search", {
      params: {
        page,
        param,
      },
    });
    return data;
  },
  async getEmployeeById(id) {
    const data = await axios.get(`/api/v1/employee/${id}`);
    return data;
  },
  async deleteEmployee(id) {
    const data = await axios.delete(`/api/v1/employee/admin/${id}`);
    return data;
  },
  async updateEmployee(id, update) {
    const data = await axios.put(
      `/api/v1/employee/admin-reception/${id}`,
      update
    );
    return data;
  },
  async createEmployee(create) {
    const data = await axios.post(
      "/api/v1/employee/admin-reception/add",
      create
    );
    return data;
  },
  async employeeAppointmentList() {
    const { data } = await axios.get("/api/v1/employee/appointment-list");
    return data;
  },
};
export default EmployeeService;
