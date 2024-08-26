import axios, { AxiosError } from "axios";

/**
 * 프론트=> 백엔드 요청 모듈화 객체
 *
 */
export const apiFe = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BE_URL}`,
  timeout: 15_000,
  withCredentials: true,
});
