import { ToDoListContainer } from "../components/container/common.styles";
import ToDoItem from "../components/container/todo.comp";
import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useAppSelector } from "../util/hooks";
import { getToDoItemToday, isToDoItemToday } from "../util/validation";

interface Props {}

const HomePage = (props: Props) => {
  const { tasks, routines } = useAppSelector((state) => state.user.currentUser);

  const todos = getToDoItemToday(tasks, routines);

  return (
    <PageWrapper>
      {todos.length ? (
        <ToDoListContainer>
          {todos
            .filter((todo: any) => isToDoItemToday(todo))
            .map((item: any) => (
              <ToDoItem key={item.id} todo={item} />
            ))}
        </ToDoListContainer>
      ) : (
        <ToDoListContainer>no task has added yet</ToDoListContainer>
      )}
    </PageWrapper>
  );
};

export default HomePage;
