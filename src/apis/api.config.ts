export const domain: string = "http://localhost:8080";
export default function api(url: string) {
  return `${domain}/${url}`;
}
export interface IResponseLayout<T>{
  data: T;
  message: string;
  success: boolean;
}