import "../common/spinner.css"

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      {<div className="spinner-text">
          <h6 className="text-secondary ps-3">Cargando datos ...</h6>
      </div>}
    </div>
    
    /* <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "var(--background-color)"}}>
        <div className="spinner-grow text-secondary" role="status">
        </div>
        <div>
          <h6 className="text-secondary ps-3">Cargando datos ...</h6>
        </div>
    </div> */
  )
}

export default Spinner