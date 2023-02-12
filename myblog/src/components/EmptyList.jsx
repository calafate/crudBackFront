import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const EmptyList = () => (

    <div className="col-sm-4 offset-4 p-5">
        <div className="p-3 d-flex justify-content-evenly border border-danger align-items-center">
            <FontAwesomeIcon icon={faTriangleExclamation} size="2x" color="red" />
            <h6 className="text-danger">No se encontró información</h6>
            <FontAwesomeIcon icon={faTriangleExclamation} size="2x" color="red" />
        </div>
    </div>

);

export default EmptyList;