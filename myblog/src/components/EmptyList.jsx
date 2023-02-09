import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const EmptyList = () => (
    <div className='container bg-danger p-5 d-flex justify-content-evenly align-items-center'>
        <FontAwesomeIcon icon={faTriangleExclamation} size="3x" color="#fff" />
        <h4 className="text-white">No se encontró información</h4>
        <FontAwesomeIcon icon={faTriangleExclamation} size="3x" color="#fff" />
    </div>
);

export default EmptyList;