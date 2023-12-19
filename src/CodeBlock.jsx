import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeBlock(){
  const codeString =`  import bluesky
  import databroker from bluesky.callbacks.best_effort
  import BestEffortCallback
  cat = databroker.temp().v2`;
  return (
    <SyntaxHighlighter className='text-left' showLineNumbers={true} language="python" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  )
}