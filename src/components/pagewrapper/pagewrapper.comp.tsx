import { ReactChild } from "react";
import { WrapperMain } from "./pagewrapper.styles";

interface Props {
  children: ReactChild;
}

const PageWrapper = (props: Props) => {
  return <WrapperMain>{props.children}</WrapperMain>;
};

export default PageWrapper;
