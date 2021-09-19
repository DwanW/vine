import {
  checkCurrentCompletion,
  getConditionString,
  getCurrentProgressValue,
} from "../../util/validation";
import { EmptyIcon, IconContainer } from "./common.styles";
import {
  ToDoInfoContainer,
  ToDoItemContainer,
  ToDoItemDetail,
  ToDoItemSubTitle,
  ToDoItemTitle,
} from "./todo.styles";

interface Props {
  todo: any;
}

const ToDoItem = ({ todo }: Props) => {
  const currentProgress = getCurrentProgressValue(todo);
  const completionValue = checkCurrentCompletion(todo);

  if (todo.hasOwnProperty("records")) {
    return (
      <ToDoItemContainer>
        <ToDoInfoContainer>
          <IconContainer>
            <img src="assets/icon/routine.svg" alt="todo icon" />
          </IconContainer>
          <div>
            <ToDoItemTitle>{`${todo.name} ${getConditionString(
              todo.goal
            )}`}</ToDoItemTitle>
            <ToDoItemSubTitle>{`routine  current: ${
              currentProgress < 0 ? 0 : currentProgress
            }`}</ToDoItemSubTitle>
          </div>
        </ToDoInfoContainer>
        <IconContainer>
          {completionValue === 1 ? (
            <img src="assets/icon/complete.svg" alt="complete icon" />
          ) : completionValue === 0.5 ? (
            <img src="assets/icon/pending.svg" alt="pending icon" />
          ) : (
            <EmptyIcon />
          )}
        </IconContainer>
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
