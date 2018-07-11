import styled, { keyframes } from 'styled-components';

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  text-align: center;
`;

export const Header = styled.header`
  background-color: #222;
  height: 250px;
  padding: 20px;
  color: white;
`;

export const Intro = styled.p`
  font-size: large;
`;

export const Logo = styled.img`
  animation: ${props => (props.isLoading ? `${rotate360} infinite 20s linear` : `none`)};
  height: 80px;
`;

export const Title = styled.h1`
  font-size: 1.5em;
`;
