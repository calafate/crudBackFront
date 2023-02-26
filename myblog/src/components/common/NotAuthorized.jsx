import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

const NotAuthorized = () => {
  return (
    <div className = "not-authorized">
        <h1>NO tiene autorización para ver esta página</h1>
        <hr/>
        <h3>Debe registrarse</h3>
        <FontAwesomeIcon icon="faSkullCrossbones" size="4x" color="var(--danger-color)"/>
    </div>
  )
}

export default NotAuthorized