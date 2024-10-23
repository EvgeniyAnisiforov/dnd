import React from "react"
import { useDrag } from "react-dnd"

const GridItems = ({ components, setAreaCursor, sizeCell, height, width }) => {
  return (
    <>
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          component={component}
          setAreaCursor={(e) => setAreaCursor(e)}
          sizeCell={sizeCell}
          height={height}
          width={width}
        />
      ))}
    </>
  )
}

const DraggableComponent = ({
  component,
  setAreaCursor,
  sizeCell,
  height,
  width,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: {
      id: component.id,
      x: component.x,
      y: component.y,
      type: "component",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: `${component.x * sizeCell}px`,
        top: `${component.y * sizeCell}px`,
        width: `${sizeCell * 2}px`,
        height: `${sizeCell * 2}px`,
        backgroundColor: "#9A9A9A",
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        display: "grid",
        gridTemplateColumns: `repeat(2, ${sizeCell}px)`,
        gridTemplateRows: `repeat(2, ${sizeCell}px)`,
        zIndex: `${component.id}`,
      }}
    >
      <div
        style={{ cursor: "grab", zIndex: `${component.id + 1}` }}
        onMouseDown={() => setAreaCursor("TopLeft")}
      ></div>
      <div
        style={{ cursor: "grab", zIndex: `${component.id + 1}` }}
        onMouseDown={() => setAreaCursor("TopRight")}
      ></div>
      <div
        style={{ cursor: "grab", zIndex: `${component.id + 1}` }}
        onMouseDown={() => setAreaCursor("BottomLeft")}
      ></div>
      <div
        style={{ cursor: "grab", zIndex: `${component.id + 1}` }}
        onMouseDown={() => setAreaCursor("BottomRight")}
      ></div>
      <p
        style={{
          position: "absolute",
          top: "10px",
          left: "5px",
          fontSize: `${
            (height | width) <= 10
              ? 20
              : ((height | width) > 10) & ((height | width) < 20)
              ? 12
              : ((height | width) >= 20) & ((height | width) < 30)
              ? 6
              : ((height | width) >= 30) & ((height | width) < 40)
              ? 5
              : 4
          }px`,
        }}
      >
        Компонент {component.id}
      </p>
    </div>
  )
}

export default GridItems
