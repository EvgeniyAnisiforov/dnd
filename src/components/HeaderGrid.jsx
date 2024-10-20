import style from "./HeaderGrid.module.css"

const HeaderGrid = ({ setHeight, setWidth, height, width, addComponents }) => {
  const handleChangeHeight = (event) => {
    setHeight(event.target.value)
  }
  const handleChangeWidth = (event) => {
    setWidth(event.target.value)
  }

  return (
    <div className={style["HeaderContainer"]}>
      <button onClick={() => addComponents()}>Добавить</button>
      <div>
        <label>Высота</label>
        <input onChange={handleChangeHeight} value={height} />
      </div>
      <div>
        <label>Ширина</label>
        <input onChange={handleChangeWidth} value={width} />
      </div>
    </div>
  )
}

export default HeaderGrid
