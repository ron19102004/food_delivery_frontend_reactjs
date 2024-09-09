// export const domain: string = "https://d0f3-2401-d800-553b-c743-1555-7e73-91ee-13f6.ngrok-free.app";
export const domain: string = "http://localhost:8080";
// export const domain: string = "https://46e5-103-172-79-198.ngrok-free.app";
export default function api(url: string) {
  return `${domain}/${url}`;
}
export interface IResponseLayout<T>{
  data: T;
  message: string;
  status: boolean;
}
export interface Entity{
  id: number;
}