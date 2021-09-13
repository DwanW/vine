import PageWrapper from "../components/pagewrapper/pagewrapper.comp";
import { useAppSelector } from "../util/hooks";
import { isToDoItemToday } from "../util/validation";

interface Props {}

const HomePage = (props: Props) => {
  const { tasks, routines } = useAppSelector((state) => state.user.currentUser);

  return (
    <PageWrapper>
      {tasks.length || routines.length ? (
        <div>
          <div>
            {tasks
              .filter((taskObj: any) => isToDoItemToday(taskObj))
              .map((task: any) => (
                <div key={task.id}>
                  <div>icon</div>
                  <div>
                    <div>{task.name}</div>
                    <div>task</div>
                  </div>
                </div>
              ))}
            {routines
              .filter((routineObj: any) => isToDoItemToday(routineObj))
              .map((routine: any) => (
                <div key={routine.id}>
                  <div>icon</div>
                  <div>
                    <div>{routine.name}</div>
                    <div>routine</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>no task has added yet</div>
      )}
    </PageWrapper>
  );
};

export default HomePage;
