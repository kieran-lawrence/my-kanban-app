import styled from "styled-components";
import Task, { TaskProps } from "./Task";
import { useState } from "react";

type TColumn = {
  id: string;
  name: string;
  tasks: TaskProps[];
};

export default function Board() {
  const [dragging, setDragging] = useState<boolean>(false);
  const [columns, setColumns] = useState<TColumn[]>([
    {
      id: "todo",
      name: "To Do",
      tasks: [
        {
          id: 1,
          priority: "low",
          title: "Task 1",
          description: "Description 1",
        },
      ],
    },
    {
      id: "inprog",
      name: "In Progress",
      tasks: [
        {
          id: 2,
          priority: "medium",
          title: "Task 2",
          description: "Description 2",
        },
        {
          id: 3,
          priority: "low",
          title: "Task 3",
          description: "Description 3",
        },
      ],
    },
    {
      id: "complete",
      name: "Complete",
      tasks: [
        {
          id: 4,
          priority: "high",
          title: "Task 4",
          description: "Description 4",
        },
      ],
    },
  ]);
  // To move a task from one column to another
  // 1. Get the task and its current column
  // 2. Find the column the task wants to go into
  // 3. Update columns to reflect the change
  const onDragStart = (e: React.DragEvent, task: TaskProps) => {
    e.dataTransfer.setData("application/json", JSON.stringify(task));
    setDragging(true);
    console.log("Dragging started");
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const onDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    const currTask: TaskProps = JSON.parse(
      e.dataTransfer.getData("application/json")
    );

    // Find the source column and task
    let taskToMove;
    // Loop over the columns
    const updatedColumns = columns.map((column) => {
      // Look for the task in each column
      if (column.tasks.find((task) => task.id === currTask.id)) {
        taskToMove = column.tasks.find((task) => task.id === currTask.id); // Set the task to move
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== currTask.id),
        }; // Remove task from old column
      }
      return column;
    });

    // Add the task to the target column
    const targetColumn = updatedColumns.find((column) => column.id === colId);
    if (targetColumn && taskToMove) {
      targetColumn.tasks.push(taskToMove); // Add task to target column
    }
    // Update state with new columns structure
    setColumns(updatedColumns);
    setDragging(false);
  };
  return (
    <SBoard>
      {columns.map((col) => (
        <SBoardColumn
          key={col.name}
          onDrop={(e) => onDrop(e, col.id)}
          onDragOver={onDragOver}
          $isDragging={dragging}
        >
          <SBoardColumnHeader>
            {col.name} <span>{col.tasks.length}</span>
          </SBoardColumnHeader>
          <SBoardColumnBody>
            {col.tasks.map((task) => (
              <Task key={task.id} {...task} onDragStart={onDragStart} />
            ))}
          </SBoardColumnBody>
        </SBoardColumn>
      ))}
    </SBoard>
  );
}

const SBoard = styled.div`
  display: grid;
  margin-top: 1px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
`;

const SBoardColumn = styled.div<{ $isDragging: boolean }>`
  background-color: #e5e5e5;
  min-height: 5vh;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  border: ${({ $isDragging }) => ($isDragging ? "1px solid blue" : "none")};
`;
const SBoardColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-weight: 600;
  font-size: 1.1rem;
  span {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b9b9b9;
    font-size: 0.9rem;
    font-weight: 400;
  }
`;
const SBoardColumnBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
