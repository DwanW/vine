import { ToDoItemContainer } from "./todo.styles";

interface Props {
  todo: any;
}

const ToDoItem = ({ todo }: Props) => {
  if (todo.hasOwnProperty("records")) {
    return (
      <ToDoItemContainer>
        <div>type</div>
        <div>
          <div>{todo.name}</div>
          <div>routine</div>
        </div>
      </ToDoItemContainer>
    );
  }
  return (
    <ToDoItemContainer>
      <div>type</div>
      <div>
        <div>{todo.name}</div>
        <div>task</div>
      </div>
    </ToDoItemContainer>
  );
};

export default ToDoItem;
