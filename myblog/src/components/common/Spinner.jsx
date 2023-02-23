import "../common/spinner.css"

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      {<div className="spinner-text">
          <h6 className="text-secondary ps-3">Cargando datos ...</h6>
      </div>}
    </div>
  )
}

export default Spinner