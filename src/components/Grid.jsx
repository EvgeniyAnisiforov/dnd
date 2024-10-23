import React from "react"
import GridItems from "./GridItems"
import { useDrop } from "react-dnd"

const Grid = ({
  height,
  width,
  components,
  setComponents,
  sizeCell,
  areaCursor,
  setAreaCursor,
}) => {
  const moveComponent = (id, x, y, area) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, x, y, area } : component
      )
    )
  }

  const [, drop] = useDrop(
    () => ({
      accept: ["component", "sidebarComponent"],
      drop: (item, monitor) => {
        const itemType = monitor.getItemType()
        const gridContainer = document.querySelector(".grid-container")

        if (gridContainer) {
          const gridRect = gridContainer.getBoundingClientRect()
          const offset = monitor.getClientOffset()

          let newX = Math.floor((offset.x - gridRect.left) / sizeCell)
          let newY = Math.floor((offset.y - gridRect.top) / sizeCell)

          if (areaCursor === "TopLeft") {
          } else if (areaCursor === "TopRight") {
            newX -= 1
          } else if (areaCursor === "BottomLeft") {
            newY -= 1
          } else if (areaCursor === "BottomRight") {
            newX -= 1
            newY -= 1
          }

          if (newX < 0) newX = 0
          if (newY < 0) newY = 0
          if (newX > width - 2) newX = width - 2
          if (newY > height - 2) newY = height - 2

          if (itemType === "sidebarComponent") {
            const newId = components.length
              ? Math.max(...components.map((c) => c.id)) + 1
              : 1

            const newComponent = {
              id: newId,
              x: newX,
              y: newY,
              area: areaCursor || "TopLeft",
            }
            setComponents((prev) => [...prev, newComponent])
          } else {
            moveComponent(item.id, newX, newY, areaCursor)
          }
        }
      },
    }),
    [areaCursor, setComponents, components, height, width, sizeCell]
  )

  return (
    <div
      ref={drop}
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, ${sizeCell}px)`,
        gridTemplateRows: `repeat(${height}, ${sizeCell}px)`,
        position: "relative",
      }}
    >
      {Array.from({ length: width * height }).map((_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#d9d9d9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #c5c5c5",
            position: "relative",
          }}
        ></div>
      ))}

      <GridItems
        components={components}
        setAreaCursor={(e) => setAreaCursor(e)}
        sizeCell={sizeCell}
        height={height}
        width={width}
      />
    </div>
  )
}

export default Grid
