import { useState } from "react"
import Grid from "./components/Grid"
import HeaderGrid from "./components/HeaderGrid"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const App = () => {
  const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(10)

  const [components, setComponents] = useState([
    { id: 1, x: 2, y: 4 },
    { id: 2, x: 5, y: 3 },
    { id: 3, x: 1, y: 7 },
    { id: 4, x: 8, y: 7 },
  ])

  const addComponents = () => {
    setComponents([...components, { id: components.length + 1, x: 1, y: 1 }])
  }

  return (
    <div className="App">
      <div>
        <HeaderGrid
          height={height}
          setHeight={(e) => setHeight(e)}
          width={width}
          setWidth={(e) => setWidth(e)}
          addComponents={() => addComponents()}
        />
        <DndProvider backend={HTML5Backend}>
          <div className="grid-container">
            <Grid
              height={height}
              width={width}
              components={components}
              setComponents={setComponents}
            />
          </div>
        </DndProvider>
      </div>
    </div>
  )
}

export default App
