import { IconContext } from "react-icons";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
}
export default function Button({ text, icon }: ButtonProps) {
  return (
    <SButton>
      <IconContext.Provider value={{ className: "icon" }}>
        {icon}
      </IconContext.Provider>
      {text}
    </SButton>
  );
}
const SButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;
  outline: none;
  background-color: #404aa2;
  font-size: calc(6px + 1vmin);
  color: #fdfdfd;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  font-size: 18px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #30377a;
  }
  &:focus,
  &:active {
    outline-offset: 2px;
    outline: 2px solid #404aa2;
  }
`;
