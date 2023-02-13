import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./emptyList.css";

const EmptyList = () => (
  <div className="col-sm-6 offset-3 p-5">
    <div className="p-3 d-flex justify-content-evenly border border-danger align-items-center">
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        size="2x"
        color="var(--danger-color)"
      />
      <h6 className="empty-color">No se encontró información</h6>
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        size="2x"
        color="var(--danger-color)"
      />
    </div>
  </div>
);

export default EmptyList;
