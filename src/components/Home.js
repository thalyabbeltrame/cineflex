import styled from "styled-components";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Movies from "./Movies";

export default function Home() {

  return (
    <Container>
      <Header />
      <SubHeader text={'Selecione o filme'}/>
      <Movies />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`