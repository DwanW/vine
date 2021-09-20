import {
  addRecord,
  toggleTaskCompletion,
  updateRecord,
} from "../../redux/user/user.slice";
import { useAppDispatch } from "../../util/hooks";
import {
  checkCurrentCompletion,
  getConditionString,
  getCurrentProgressValue,
  getTodayRecord,
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
  toggleDialog: (todo: any) => void;
}

const ToDoItem = ({ todo, toggleDialog }: Props) => {
  const dispatch = useAppDispatch();

  if (todo.hasOwnProperty("records")) {
    const currentProgress = getCurrentProgressValue(todo);
    const completionValue = checkCurrentCompletion(todo);
    const description = `${getConditionString(todo.goal)} ${
      todo.unit !== undefined ? todo.unit : ""
    }`;

    const getCurrentValue = () => {
      return `current: ${currentProgress < 0 ? 0 : currentProgress} ${
        todo.unit !== undefined ? todo.unit : ""
      }`;
    };

    const handleClick = () => {
      if (todo.goal === undefined) {
        // boolean based dispatch
        let todayRecord = getTodayRecord(todo.records);
        if (todayRecord) {
          let updatedRecord = {
            id: todo.id,
            recordId: todayRecord.recordId,
            isCompleted: !todayRecord.isCompleted,
            value: !todayRecord.isCompleted ? 1 : 0,
          };
          // update record
          dispatch(updateRecord(updatedRecord));
        } else {
          // add new record
          dispatch(
            addRecord({
              id: todo.id,
              value: 1,
              isCompleted: true,
            })
          );
        }
      } else {
        // numeric based
        toggleDialog(todo);
      }
    };

    return (
      <ToDoItemContainer>
        <ToDoInfoContainer>
          <IconContainer>
            <img src="assets/icon/routine.svg" alt="todo icon" />
          </IconContainer>
          <div>
            <ToDoItemTitle>{`${todo.name} ${description}`}</ToDoItemTitle>
            <ToDoItemSubTitle>
              Routine {todo.goal !== undefined ? getCurrentValue() : ""}
            </ToDoItemSubTitle>
          </div>
        </ToDoInfoContainer>
        <IconButton onClick={handleClick}>
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
