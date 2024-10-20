import React from "react"
import { useDrag } from "react-dnd"

const GridItems = ({ components, setArea }) => {
  return (
    <>
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          component={component}
          setArea={(e) => setArea(e)}
        />
      ))}
    </>
  )
}

const DraggableComponent = ({ component, setArea }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { id: component.id, x: component.x, y: component.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: `${component.x * 75}px`,
        top: `${component.y * 75}px`,
        width: "150px",
        height: "150px",
        backgroundColor: "#9A9A9A",
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing": 'grab',
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        zIndex: `${component.id}`
      }}
    >
      <div
        style={{
          cursor: "grab",
          position: "relative",
          draggable: true,
        }}
        onMouseDown={() => {
          setArea("TopLeft")
        }}
      ></div>
      <div
        style={{
          cursor: "grab",
          position: "relative",
          draggable: true,
        }}
        onMouseDown={() => setArea("TopRight")}
      ></div>
      <div
        style={{
          cursor: "grab",
          position: "relative",
          draggable: true,
        }}
        onMouseDown={() => setArea("BottomLeft")}
      ></div>
      <div
        style={{
          cursor: "grab",
          position: "relative",
          draggable: true,
        }}
        onMouseDown={() => setArea("BottomRight")}
      ></div>
      <p
        style={{position: "absolute", top: "10px", left: "5px" }}
      >
        Компонент {component.id}
      </p>
    </div>
  )
}

export default GridItems
