import Button from '@mui/material/Button';
import { useState } from 'react';
import BasicTable from './Table.jsx'
import CodeBlock from './CodeBlock.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import React from 'react';
import { ReactComponent as Logo  } from './assets/bluesky-logo-dark.svg'

export default function Body() {

  const [metadata, setMetadata] = useState('');

  const url = 'http://127.0.0.1:5000/'; //address for python server on port 5000

  const handleClick = async(path) => {
    try {
      const response = await fetch(url + path);
      const responseData = await response.json();
      setMetadata(responseData);
      console.log(metadata);
    } catch(error) {
      console.log('Error in handleLoadButton' +  error);
    }
  }


  return (
    <div>
      <CssBaseline />
        <Container maxWidth="md">
          <Logo />
          <section>
            <h2>Hello World with Bluesky, Flask, and React</h2>
            <p>A tuorial for running a hellow world file in Bluesky can be found here https://bcda-aps.github.io/bluesky_training/tutor/hello_world.html</p>
            <p>The steps are outlined as shown:</p>
            <CodeBlock />
          </section>
          <Button onClick = {()=>handleClick('data')} variant="contained">Load</Button>
          <CssBaseline />
          <Container maxWidth="md">
            {metadata !== '' ? <BasicTable metadata={metadata.start} title='Start' /> : <fragment></fragment>}
            {metadata !== '' ? <BasicTable metadata={metadata.stop} title='Stop' /> : <fragment></fragment>}
          </Container>
        </Container>
    </div>
  );
}
