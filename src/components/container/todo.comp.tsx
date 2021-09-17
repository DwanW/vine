import { IconContainer } from "./common.styles";
import {
  ToDoItemContainer,
  ToDoItemDetail,
  ToDoItemSubTitle,
  ToDoItemTitle,
} from "./todo.styles";

interface Props {
  todo: any;
}

const ToDoItem = ({ todo }: Props) => {
  if (todo.hasOwnProperty("records")) {
    return (
      <ToDoItemContainer>
        <IconContainer>
          <img src="assets/icon/routine.svg" alt="todo icon" />
        </IconContainer>
        <div>
          <ToDoItemTitle>{todo.name}</ToDoItemTitle>
          <ToDoItemSubTitle>routine</ToDoItemSubTitle>
        </div>
      </ToDoItemContainer>
    );
  }
  return (
    <ToDoItemContainer>
      <IconContainer>
        <img src="assets/icon/task.svg" alt="todo icon" />
      </IconContainer>
      <ToDoItemDetail>
        <ToDoItemTitle>{todo.name}</ToDoItemTitle>
        <ToDoItemSubTitle>task</ToDoItemSubTitle>
      </ToDoItemDetail>
    </ToDoItemContainer>
  );
};

export default ToDoItem;
