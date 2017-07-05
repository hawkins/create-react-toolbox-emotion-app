import React from "react";
import styled from "emotion/react";

const H1 = styled.h1`
  color: #ff4081;
`;

const Code = styled.code`
  color: rgb(35, 93, 230);
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  &:after { content: "\`" };
  &:before { content: "\`" };
`;

export default () => <H1>This was styled with <Code>emotion</Code>!</H1>;
