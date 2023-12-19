import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeBlock({ codeString }){

  return (
    <SyntaxHighlighter className='text-left' showLineNumbers={true} language="python" style={docco} children={codeString}>

    </SyntaxHighlighter>
  )
}