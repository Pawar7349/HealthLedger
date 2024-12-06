
import { Box, Alert, Typography } from '@mui/material';
import useAlert from '../../contexts/AlertContext/useAlert';

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (!text || !type) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '600px',
        zIndex: 1000,
      }}
    >
      <Alert
        severity={type}
        sx={{
          width: '100%',
          padding: '16px 24px',
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          {text}
        </Typography>
      </Alert>
    </Box>
  );
};

export default AlertPopup;
