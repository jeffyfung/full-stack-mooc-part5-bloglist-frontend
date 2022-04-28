const Notification = ({ message }) => {
  if (message) {
    return (
      <div className="error">{message}</div>
    )
  }
}

export default Notification