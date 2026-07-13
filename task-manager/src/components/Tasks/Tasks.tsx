"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/context/GlobalProvider";

const Tasks = () => {
  const { theme } = useGlobalState();
  return (
    <TaskStyled theme={theme}>
      <div>
        <h1>Tasks</h1>
      </div>
    </TaskStyled>
  );
};

const TaskStyled = styled.div`
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  height: 100%;
  border-radius: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`;

export default Tasks;
