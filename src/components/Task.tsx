import styled from "styled-components";
import { MdDragIndicator } from "react-icons/md";

export type TaskProps = {
  id: number;
  priority: "low" | "medium" | "high";
  title: string;
  description: string;
  onDragStart?: (e: React.DragEvent, task: TaskProps) => void;
};

export default function Task({
  id,
  priority,
  title,
  description,
  onDragStart,
}: TaskProps) {
  if (!onDragStart) return <></>;
  return (
    <STask
      priority={priority}
      draggable
      onDragStart={(e) => onDragStart(e, { id, priority, title, description })}
    >
      <div className="taskPriority">
        <MdDragIndicator className="dragIcon" />
        <span>{priority}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </STask>
  );
}
const STask = styled.div<Pick<TaskProps, "priority">>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fdfdfd;
  border: 1px solid #b9b9b9;

  h3 {
    font-weight: 600;
    margin: 0;
  }
  .taskPriority {
    .dragIcon {
      opacity: 0;
    }
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;
    span {
      background-color: ${({ priority }) =>
        priority === "low"
          ? "#a8e69ba0" // Low
          : priority === "medium"
          ? "#f9e04fa0" // Medium
          : "#e5626fa0"}; // high
      color: ${({ priority }) =>
        priority === "low"
          ? "#226725" // Low
          : priority === "medium"
          ? "#6e6026" // Medium
          : "#49200d"}; // high

      width: fit-content;
      padding: 0.3rem 0.6rem;
      border-radius: 0.8rem;
      align-self: flex-end;
    }
  }
  &:hover {
    cursor: move;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.018), 0 1px 2px rgba(0, 0, 0, 0.24);
    .dragIcon {
      opacity: 1;
    }
  }
`;
