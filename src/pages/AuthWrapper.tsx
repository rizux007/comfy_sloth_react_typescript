import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";
import styled from "styled-components";
const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }
  return <>{children}</>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;
export default AuthWrapper;
