import React, { useState } from "react"
import style from "./Grid.module.css"
import GridItems from "./GridItems"
import { useDrop } from "react-dnd"

const Grid = ({ height, width, components, setComponents }) => {
  const [areaCursor, setAreaCursor] = useState()

  const moveComponent = (id, x, y, area) => {
    setComponents((prev) =>
      prev.map((component) =>
        component.id === id ? { ...component, x, y, area } : component
      )
    )
  }

  const [, drop] = useDrop(
    () => ({
      accept: "component",

      drop: (item, monitor) => {
        const gridContainer = document.querySelector(".grid-container")

        if (gridContainer) {
          const gridRect = gridContainer.getBoundingClientRect()
          const offset = monitor.getClientOffset()

          if (areaCursor === "TopLeft") {
            const newX = Math.floor((offset.x - gridRect.left) / 75)
            const newY = Math.floor((offset.y - gridRect.top) / 75)
            if ((newX !== width - 1) & (newY !== height - 1)) {
              moveComponent(item.id, newX, newY, areaCursor)
            }
          }
          if (areaCursor === "TopRight") {
            const newX = Math.floor((offset.x - gridRect.left) / 75) - 1
            const newY = Math.floor((offset.y - gridRect.top) / 75)
            if ((newX !== -1) & (newY !== height - 1)) {
              moveComponent(item.id, newX, newY, areaCursor)
            }
          }
          if (areaCursor === "BottomLeft") {
            const newX = Math.floor((offset.x - gridRect.left) / 75)
            const newY = Math.floor((offset.y - gridRect.top) / 75) - 1
            if ((newX !== width - 1) & (newY !== -1)) {
              moveComponent(item.id, newX, newY, areaCursor)
            }
          }
          if (areaCursor === "BottomRight") {
            const newX = Math.floor((offset.x - gridRect.left) / 75) - 1
            const newY = Math.floor((offset.y - gridRect.top) / 75) - 1
            if ((newX !== -1) & (newY !== -1)) {
              moveComponent(item.id, newX, newY, areaCursor)
            }
          }
        }
      },
    }),
    [areaCursor]
  )
  return (
    <div
      ref={drop}
      className="grid-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, 75px)`,
        gridTemplateRows: `repeat(${height}, 75px)`,
        position: "relative",
      }}
    >
      {Array.from({ length: width * height }).map((_, index) => (
        <div key={index} className={style["grid-item"]}></div>
      ))}

      <GridItems components={components} setArea={(e) => setAreaCursor(e)} />
    </div>
  )
}

export default Grid
