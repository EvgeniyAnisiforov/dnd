import React from "react"
import { useDrag } from "react-dnd"

const SideBarComponents = ({ width, height, sizeCell, setAreaCursor }) => {
  const components = [
    { id: "sidebar1", name: "Компонент X" },
    { id: "sidebar2", name: "Компонент Y" },
    { id: "sidebar3", name: "Компонент Z" },
  ]

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        border: "2px dashed #ccc",
        height: `auto`,
        width: `${sizeCell * 2 + 20}px`,
        padding: "10px",
        gap: "10px",
        marginRight: "50px",
        marginTop: "40px",
      }}
    >
      {components.map((component) => (
        <DraggableSidebarComponent
          key={component.id}
          component={component}
          sizeCell={sizeCell}
          width={width}
          height={height}
          setAreaCursor={setAreaCursor}
        />
      ))}
    </div>
  )
}

const DraggableSidebarComponent = ({
  component,
  sizeCell,
  width,
  height,
  setAreaCursor,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "sidebarComponent",
    item: { id: component.id, name: component.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        width: `${sizeCell * 2}px`,
        height: `${sizeCell * 2}px`,
        backgroundColor: "#9A9A9A",
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        display: "grid",
        gridTemplateColumns: `repeat(2, ${sizeCell}px)`,
        gridTemplateRows: `repeat(2, ${sizeCell}px)`,
        zIndex: `${component.id}`,
        position: "relative",
      }}
    >
      <div
        style={{ cursor: "grab", zIndex: 2 }}
        onMouseDown={() => setAreaCursor("TopLeft")}
      ></div>
      <div
        style={{ cursor: "grab", zIndex: 2 }}
        onMouseDown={() => setAreaCursor("TopRight")}
      ></div>
      <div
        style={{ cursor: "grab", zIndex: 2 }}
        onMouseDown={() => setAreaCursor("BottomLeft")}
      ></div>
      <div
        style={{ cursor: "grab", zIndex: 2 }}
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
        {component.name}
      </p>
    </div>
  )
}

export default SideBarComponents
