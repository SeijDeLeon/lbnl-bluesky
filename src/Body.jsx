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

  const scrollToResults = () => {
    var results = document.getElementById('results');
    var resultsDisplayHeight = results.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({top: resultsDisplayHeight, behavior: 'smooth'});
  }
  const handleClick = async(path) => {
    try {
      const response = await fetch(url + path);
      const responseData = await response.json();
      setMetadata(responseData);
      console.log(metadata);
    } catch(error) {
      console.log('Error in handleLoadButton' +  error);
    }

    setTimeout(scrollToResults, 150);

  }

  const codeStringTutorial =`  #Jupyter Notebook
  import bluesky
  import databroker from bluesky.callbacks.best_effort
  import BestEffortCallback
  cat = databroker.temp().v2
  RE = bluesky.RunEngine()
  RE.subscribe(cat.v1.insert)
  RE.subscribe(BestEffortCallback())
  %run -i ~/bluesky/user/quick_hello.py
  RE(hello_world())
  run = cat[-1]
  metadata=run.metadata`;

  const codeStringFlask =`  #server.py
  sys.path.append('/Users/seij/opt/anaconda3/envs/bluesky_2023_3/lib/python3.11/site-packages')
  import quick_hello #reference to quick_hello.py
  import bluesky
  import databroker
  from bluesky.callbacks.best_effort import BestEffortCallback

  cat = databroker.temp().v2
  RE = bluesky.RunEngine()
  RE.subscribe(cat.v1.insert)
  RE.subscribe(BestEffortCallback())

  #Wrap the hello world function in a wrapper to pass it as an argument
  test_function = quick_hello.blueskyHello()

  RE(test_function())

  run = cat[-1]
  metadata=run.metadata`;

  const codeStringAPI =`  #server.py
  @app.route("/data")
  def data():
      try:
        response = jsonify(metadata)
        response.headers.add('Access-Control-Allow-Origin', '*')
        code = 200
      except:
        response = ''
        code = 500
      return response, code`;


  return (
    <div>
      <CssBaseline />
        <Container maxWidth="md">
          <Logo />
          <section className="text-left space-y-8">
            <h1 className='text-xl text-center font-semibold'>Hello World demonstration with Bluesky using Flask, React</h1>
            <p>The instructions for running a hello world file in Bluesky can be found at <a className='underline text-blue-400' target="_blank" rel="noreferrer" href="https://bcda-aps.github.io/bluesky_training/tutor/hello_world.html" >this bluesky training tutorial.&#x2197;</a> The tutorial is intended for use with a console or notebook. </p>
            <p>The general steps (after all necessary dependencies are installed) are as shown below.</p>
            <CodeBlock codeString={codeStringTutorial} />
            <p>The equivalent code can be used in a simple python server using flask. There are some small differences related to the implementation to ensure we have access to the bluesky files. In addition, the various print() statements in the python files will be less useful unless they are logged from the server.</p>
            <CodeBlock codeString={codeStringFlask} />
            <p>A basic endpoint can be created in the flask server to provide the metadata to a client.</p>
            <CodeBlock codeString={codeStringAPI} />
            <p>This flask server imports and runs the Bluesky files during initial startup so they are ready for use.</p>
          </section>
          <section className='py-16' >
            <div className="flex justify-center items-center">
              <h2 className="text-lg font-medium mr-8">Try It:</h2>
              <Button id="results" onClick = {()=>handleClick('data')} variant="contained">Load</Button>
            </div>
            <CssBaseline />
            <div className={`${metadata === '' ? 'hidden' : '' } py-8 text-left`} >
              <h2 className="font-bold text-lg">Results from run.metadata</h2>
              {metadata !== '' ? <BasicTable metadata={metadata.start} title='MetaData Start' /> : <fragment></fragment>}
              {metadata !== '' ? <BasicTable metadata={metadata.stop} title='MetaData Stop' /> : <fragment></fragment>}
              <p>With a server running Bluesky and EPICS, endpoints can be made available to provide Bluesky functionality to a web based client. The above example is a simple demonstration of running the first hello-world tutorial and retrieving the results from the client.</p>
            </div>
          </section>
        </Container>
    </div>
  );
}
