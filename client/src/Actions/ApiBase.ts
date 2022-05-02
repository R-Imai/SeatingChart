export type ApiErrorData = {
  detail: string
}

export const API = {
  UrlBase: "http://localhost:5555",
  SeatingChart: {
    charts: "/api/charts",
    chartsList: "/api/charts/list",
    seats: "/api/seats",
    users: "/api/users",
    usersList: "/api/users/list",
  }
};

export default API;