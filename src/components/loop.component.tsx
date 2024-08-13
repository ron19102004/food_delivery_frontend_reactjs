import { Children} from "react";

interface IPropsLoopList<T> {
  list: T[];
  render(item: T, index: number): JSX.Element;
}
const LoopList = <T,>(props: IPropsLoopList<T>) =>
  Children.toArray(
      props.list ? props.list.map((item: T, index: number) => props.render(item, index)) : []
  );

export default LoopList;
