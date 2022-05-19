import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, error } = useSelector(({ notifications }) => {
    return notifications;
  });

  console.log(message, error);

  const style = error === true ? {} : { color: 'green', borderColor: 'green' };

  if (message) {
    return (
      <div className='error' style={style}>
        {message}
      </div>
    );
  }
};

export default Notification;
