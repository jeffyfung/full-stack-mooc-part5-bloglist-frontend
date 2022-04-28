const Notification = ({ message, error }) => {
  if (message) {
    return (
      <div className="error" style={ error ? {} : { color: 'green', borderColor: 'green' } }>
        {message}
      </div>
    )
  }
}

export default Notification