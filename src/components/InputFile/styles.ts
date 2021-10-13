import styled from "styled-components";
import { Color } from "../../model/enums/theme-colors";

export const Label = styled.label`
  cursor: pointer;
  width: 200px;
  height: 40px;
  font-size: 1rem;
  background-color: ${Color.TEXT_SECONDARY};
  color: ${Color.MAIN_DARK};
  border-radius: 4px;
  padding: 8px 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0.2rem 0;
  transition: 0.3s;

  @media (min-width: 768px) {
    margin: 0.5rem 0;
  }

  svg {
    font-size: 1.5rem;
  }

  &:hover,
  &:focus {
    background-color: #bfdbf7;
  }
`;

export const Input = styled.input`
  display: none;
`;