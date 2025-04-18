import * as React from 'react';
import { Html, Button, Head, Body } from "@react-email/components";

function Email(props) {
  const { name, email, message } = props;

  return (
    <Html lang="en">
      <Head>
        <title>Email</title>
      </Head>
      <Body>
        <h1>Email</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Message: {message}</p>
      </Body>
    </Html>
  );
}

export default Email;