import { Dialog } from "@mui/material";
import { useState } from "react";
import { ToDoListContainer } from "../components/container/common.styles";
import ToDoItem from "../components/container/todo.comp";
import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { addRecord, updateRecord } from "../redux/user/user.slice";
import { useAppDispatch, useAppSelector } from "../util/hooks";
import {
  evaluateCompletionValue,
  getConditionString,
  getTodayRecord,
  getToDoItemToday,
  isToDoItemToday,
} from "../util/validation";

interface Props {}

const HomePage = (props: Props) => {
  const { tasks, routines } = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const todos = getToDoItemToday(tasks, routines);

  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState<any>(undefined);
  const [value, setValue] = useState<number>(0);

  const handleProgressDialogToggle = (routine: any) => {
    setProgressDialogOpen(!progressDialogOpen);
    setCurrentRoutine(routine);
  };

  const getDescription = (routine: any) => {
    if (routine && routine.goal) {
      return `${getConditionString(currentRoutine.goal)} ${
        currentRoutine.unit !== undefined ? currentRoutine.unit : ""
      }`;
    } else {
      return "";
    }
  };

  const handleValueChange = (e: any) => {
    if (e.target.value >= 0) setValue(e.target.value);
  };

  const handleCancel = () => {
    setValue(0);
    setCurrentRoutine(undefined);
    setProgressDialogOpen(false);
  };

  const handleSet = () => {
    if (!currentRoutine || !currentRoutine.goal) {
      console.log("routine does not exist");
    } else {
      let todayRecord = getTodayRecord(currentRoutine.records);
      const isCompleted = evaluateCompletionValue(currentRoutine.goal, value);
      if (todayRecord) {
        let updatedRecord = {
          id: currentRoutine.id,
          recordId: todayRecord.recordId,
          isCompleted,
          value,
        };
        // update record
        dispatch(updateRecord(updatedRecord));
      } else {
        // add new record
        dispatch(
          addRecord({
            id: currentRoutine.id,
            value,
            isCompleted,
          })
        );
      }
    }
    setValue(0);
    setCurrentRoutine(undefined);
    setProgressDialogOpen(false);
  };

  return (
    <PageWrapper>
      <>
        {todos.length ? (
          <ToDoListContainer>
            {todos
              .filter((todo: any) => isToDoItemToday(todo))
              .map((item: any) => (
                <ToDoItem
                  key={item.id}
                  todo={item}
                  toggleDialog={handleProgressDialogToggle}
                />
              ))}
          </ToDoListContainer>
        ) : (
          <ToDoListContainer>no todo has been added yet</ToDoListContainer>
        )}
        <Dialog
          open={progressDialogOpen}
          onClose={() => setProgressDialogOpen(!progressDialogOpen)}
        >
          <input type="number" onChange={handleValueChange} value={value} />
          routine dialog description {getDescription(currentRoutine)}
          <button onClick={handleCancel}>cancel</button>
          <button onClick={handleSet}>set</button>
        </Dialog>
      </>
    </PageWrapper>
  );
};

export default HomePage;
