import { ToDoListContainer } from "../components/container/common.styles";
import ToDoItem from "../components/container/todo.comp";
import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useAppSelector } from "../util/hooks";
import { isToDoItemToday } from "../util/validation";

interface Props {}

const HomePage = (props: Props) => {
  const { tasks, routines } = useAppSelector((state) => state.user.currentUser);

  return (
    <PageWrapper>
      {tasks.length || routines.length ? (
        <ToDoListContainer>
          {tasks
            .filter((taskObj: any) => isToDoItemToday(taskObj))
            .map((task: any) => (
              <ToDoItem key={task.id} todo={task} />
            ))}
          {routines
            .filter((routineObj: any) => isToDoItemToday(routineObj))
            .map((routine: any) => (
              <ToDoItem key={routine.id} todo={routine} />
            ))}
        </ToDoListContainer>
      ) : (
        <ToDoListContainer>no task has added yet</ToDoListContainer>
      )}
    </PageWrapper>
  );
};

export default HomePage;
