import { toggleTaskCompletion } from "../../redux/user/user.slice";
import { useAppDispatch } from "../../util/hooks";
import {
  checkCurrentCompletion,
  getConditionString,
  getCurrentProgressValue,
} from "../../util/validation";
import { EmptyIcon, IconButton, IconContainer } from "./common.styles";
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
  const dispatch = useAppDispatch();

  if (todo.hasOwnProperty("records")) {
    const currentProgress = getCurrentProgressValue(todo);
    const completionValue = checkCurrentCompletion(todo);
    return (
      <ToDoItemContainer>
        <ToDoInfoContainer>
          <IconContainer>
            <img src="assets/icon/routine.svg" alt="todo icon" />
          </IconContainer>
          <div>
            <ToDoItemTitle>{`${todo.name} ${getConditionString(todo.goal)} ${
              todo.unit !== undefined ? todo.unit : ""
            }`}</ToDoItemTitle>
            <ToDoItemSubTitle>{`Routine  current: ${
              currentProgress < 0 ? 0 : currentProgress
            } ${todo.unit !== undefined ? todo.unit : ""}`}</ToDoItemSubTitle>
          </div>
        </ToDoInfoContainer>
        <IconButton>
          {completionValue === 1 ? (
            <img src="assets/icon/complete.svg" alt="complete icon" />
          ) : completionValue === 0.5 ? (
            <img src="assets/icon/pending.svg" alt="pending icon" />
          ) : (
            <EmptyIcon />
          )}
        </IconButton>
      </ToDoItemContainer>
    );
  }
  return (
    <ToDoItemContainer>
      <ToDoInfoContainer>
        <IconContainer>
          <img src="assets/icon/task.svg" alt="todo icon" />
        </IconContainer>
        <ToDoItemDetail>
          <ToDoItemTitle>{todo.name}</ToDoItemTitle>
          <ToDoItemSubTitle>task</ToDoItemSubTitle>
        </ToDoItemDetail>
      </ToDoInfoContainer>
      <IconButton onClick={() => dispatch(toggleTaskCompletion(todo.id))}>
        {todo.isCompleted ? (
          <img src="assets/icon/complete.svg" alt="complete icon" />
        ) : (
          <EmptyIcon />
        )}
      </IconButton>
    </ToDoItemContainer>
  );
};

export default ToDoItem;
