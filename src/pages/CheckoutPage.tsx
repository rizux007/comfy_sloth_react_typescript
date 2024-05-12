import styled from "styled-components";
import { PageHero } from "../components";

const title: string = "checkout";
const CheckoutPage = () => {
  return (
    <main>
      <PageHero title={title} />
      <Wrapper className="page">
        <h1>checkout here</h1>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div``;
export default CheckoutPage;
