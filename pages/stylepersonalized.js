import styled from "styled-components";

export const DivCards = styled.div`
  background: ${(props) => props.bg || "#0096D6"};
`;

export const DivCardsPrimary = styled.div`
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: ${(props) => props.bg || "#0096D6"};
    transform: scaleY(0);
    transition: all 0.5s;
    transform-origin: bottom;
  }
`;
