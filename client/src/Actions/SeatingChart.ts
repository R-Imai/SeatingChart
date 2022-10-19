import axios from 'axios';
import API from './ApiBase';

export type ChartResponse = {
  chart_cd: string;
  name: string;
  image: string;
}

export type ChartParameter = ChartResponse

export type SeatResponse = {
  seat_id: string;
  chart_cd: string;
  x: number;
  y: number;
}

export type SeatParameter = {
  seat_id: string;
  x: number;
  y: number;
  status: SeatStatus;
}

export type UserSeatParam = {
  seat_id: string;
  user_cd: string;
  name: string;
  furigana?: string | null;
}

export type UserSeatResponse =   {
  seat_id: string;
  x: number;
  y: number;
  user_cd: string;
  name: string;
  furigana: string;
  create_date: Date;
}

export async function getChart(chartCd: string) {
  const responce = await axios.get<ChartResponse>(`${API.UrlBase}${API.SeatingChart.charts}`, {params: {chart_cd : chartCd}}).catch((e) => {throw e})
  return responce.data;
}

export async function registerChart(chartInfo: ChartParameter) {
  await axios.post(`${API.UrlBase}${API.SeatingChart.charts}`, chartInfo).catch((e) => {throw e})
}

export async function updateChart(chartInfo: ChartParameter) {
  await axios.put<null>(`${API.UrlBase}${API.SeatingChart.charts}`, chartInfo).catch((e) => {throw e})
}

export async function deleteChart(chartCd: string) {
  await axios.delete<null>(`${API.UrlBase}${API.SeatingChart.charts}`, {params: {chart_cd : chartCd}}).catch((e) => {throw e})
}

export async function getChartList() {
  const responce = await axios.get<ChartResponse[]>(`${API.UrlBase}${API.SeatingChart.chartsList}`).catch((e) => {throw e})
  return responce.data;
}

export async function getSeats(chartCd: string) {
  const responce = await axios.get<SeatResponse[]>(`${API.UrlBase}${API.SeatingChart.seats}`, {params: {chart_cd : chartCd}}).catch((e) => {throw e})
  return responce.data;
}

export async function updateSeats(chartCd: string, seatsInfo: SeatParameter[]) {
  await axios.put<null>(`${API.UrlBase}${API.SeatingChart.seats}`, seatsInfo, {params: {chart_cd: chartCd}}).catch((e) => {throw e})
}

export async function registerUser(chartCd: string, userSeatsInfo: UserSeatParam) {
  await axios.post(`${API.UrlBase}${API.SeatingChart.users}`, userSeatsInfo, {params: {chart_cd: chartCd}}).catch((e) => {throw e})
}

export async function deleteUser(seatId: string, userCd: string) {
  await axios.delete<null>(`${API.UrlBase}${API.SeatingChart.users}`, {params: {seat_id : seatId, user_cd: userCd}}).catch((e) => {throw e})
}

export async function getUserSeats(chartCd: string) {
  const responce = await axios.get<UserSeatResponse[]>(`${API.UrlBase}${API.SeatingChart.usersList}`, {params: {chart_cd : chartCd}}).catch((e) => {throw e})
  return responce.data;
}