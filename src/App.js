import { useState, useEffect } from "react"
import Grid from "./components/Grid"
import HeaderGrid from "./components/HeaderGrid"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const App = () => {
  const [height, setHeight] = useState(10)
  const [width, setWidth] = useState(10)
  const [sizeCell, setSizeCell] = useState(75)

  const [components, setComponents] = useState([
    { id: 1, x: 2, y: 4 },
    { id: 2, x: 5, y: 3 },
    { id: 3, x: 1, y: 7 },
    { id: 4, x: 8, y: 7 },
  ])

  const addComponents = () => {
    setComponents([...components, { id: components.length + 1, x: 1, y: 1 }])
  }

  useEffect(() => {
    if (height >= 40 || width >= 40) {
      setSizeCell(15)
    } else if ((height >= 30 && height < 40) || (width >= 30 && width < 40)) {
      setSizeCell(20)
    } else if ((height >= 20 && height < 30) || (width >= 20 && width < 30)) {
      setSizeCell(25)
    } else if ((height > 10 && height < 20) || (width > 10 && width < 20)) {
      setSizeCell(45)
    } else {
      setSizeCell(75)
    }
  }, [height, width])

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
              sizeCell={sizeCell}
            />
          </div>
        </DndProvider>
      </div>
    </div>
  )
}

export default App
