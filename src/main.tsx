import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { scorm } from "@gamestdio/scorm";

// set configuration options
scorm.configure({
  debug: true,
  handleCompletionStatus: true
});

// initialize connection with parent/opener windows
scorm.initialize();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App scorm={scorm}/>
  </React.StrictMode>,
)
