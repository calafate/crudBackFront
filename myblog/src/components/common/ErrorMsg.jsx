
const ErrorMsg = ({msgError}) => {
  return (
    <div className="alert alert-danger p-1" role="alert">
      {msgError.map((item,i)=> {return <p key={i}>{item.msg}</p>})}
    </div>
  )
}

export default ErrorMsg