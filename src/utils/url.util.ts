interface IQuery {
  key: string;
  value: string | number;
}
export default function makeUrlQuery(url: string, queries?: Array<IQuery>): string {
  return (
    url + "?" + queries?.map((query) => `${query.key}=${query.value}`).join("&")
  );
}
