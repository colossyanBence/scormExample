import { Scorm } from "@gamestdio/scorm";
import { useEffect, useState } from "react";
import data from "./configs.json";

interface AppProps {
  scorm: Scorm;
}

function App({ scorm }: AppProps) {
  const [lastError, setLastError] = useState<number>();
  const [values, setValues] = useState<string[]>([]);

  const getError = async () => {
    const num = await scorm.getLastError();
    setLastError(num);
  };

  const exitScorm = ( )=> {
    const isTerminated = scorm.terminate();
    console.log("TERMINATED: ", isTerminated);
  }

  const getData = (key: string) => {
    scorm.get(key);
  };

  const sendData = (key: string, id: number) => {
    console.log("SENDING: ", key, values[id]);
    scorm.set(key, values[id]);
  };

  useEffect(() => {
    console.log("SCORM INITIALIZED: ", scorm);
    setValues(Array(data.length).fill(""));
  }, []);

  return (
    <>
      <div>
        <p>LAST ERROR: {JSON.stringify(lastError)}</p>
        <p>ISACTIVE: {JSON.stringify(scorm.isActive)}</p>
        <p>VERSION: {JSON.stringify(scorm.version)}</p>
        <p>EXIT STATUS: {JSON.stringify(scorm.exitStatus)}</p>
        <p>EXIT MODE: {JSON.stringify(scorm.handleExitMode)}</p>
        <p>isDebugActive: {JSON.stringify(scorm.isDebugActive)}</p>

        <button onClick={getError}>GET ERROR</button>
        <button onClick={exitScorm}>EXIT</button>
        <hr />
        <table>
          {data.map((item, id) => (
            <tr>
              <td>{item.group? '':''}{item.name}</td>

              {(item.type === "RO" || item.type === "RW")? (
                <td>
                  <button onClick={() => getData(item.name)}>Get data</button>
                </td>
              ): (<td></td>)}

              {(item.type === "WO" || item.type === "RW") ? (
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      const newValues = [...values];
                      newValues[id] = e.target.value;
                      setValues(newValues);
                    }}
                  />
                  <button
                    onClick={() => {
                      sendData(item.name, id);
                    }}
                  >
                    send
                  </button>
                </td>
              ): (<td></td>)}
              <td>{item.description}</td>
              <td>{item.values}</td>
              <td>{item.type}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}

export default App;
