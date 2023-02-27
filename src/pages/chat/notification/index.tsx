import { Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const Notification = () => {
  const [open, setOpen] = useState(false);
  const notification = useSelector((state: RootState) => state.socket.notification)

  useEffect(() => {
    if (!notification) return;
    setOpen(true)
    const timeout = setTimeout(() => {
      setOpen(false);
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  const onClose = () => setOpen(false)

  console.log({ open });

  if (!open) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={onClose}
      message={notification?.title + ': ' + notification?.description}
    />
  )
}

export default Notification
