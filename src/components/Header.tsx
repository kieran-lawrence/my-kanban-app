import styled from "styled-components";
import { BsKanbanFill, BsPlus } from "react-icons/bs";
import Button from "./Button";

export default function Header() {
  return (
    <SHeader>
      <div className="headerLogo">
        <BsKanbanFill size={32} color="#404aa2" />
        <h1>Kanban Board</h1>
      </div>
      <Button text="Add Task" icon={<BsPlus size={28} />} />
    </SHeader>
  );
}

const SHeader = styled.header`
  .headerLogo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    h1 {
      font-size: calc(10px + 1vmin);
    }
  }
  background-color: #fdfdfd;
  min-height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.018), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
