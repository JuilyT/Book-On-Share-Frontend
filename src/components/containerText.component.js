import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const ContainerText = (props) => (
  <Container text textAlign='center'>
    <Header size='huge' as='h3'>{props.header}</Header>
    <p>
      {props.text}
    </p>
  </Container>
)

export default ContainerText;
