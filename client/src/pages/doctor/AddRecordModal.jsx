
import React, { useState, forwardRef } from 'react';
import CustomButton from '../../components/CustomButton';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useAlert from '../../contexts/AlertContext/useAlert';
import {ClickAwayListener }from '@mui/base/ClickAwayListener';
import { Buffer } from 'buffer';


const AddRecordModal = forwardRef(({ handleClose, handleUpload, patientAddress }, ref) => {

  console.log("handleClose :",handleClose)
  console.log("handleUpload :",handleUpload)
  console.log("patientAddress :",patientAddress)

  const { setAlert } = useAlert();
  const [file, setFile] = useState(null);
  const [buffer, setBuffer] = useState(null);


  const handleFileChange = fileObj => {
    const { file } = fileObj;
    if (!['image/png', 'application/pdf'].includes(file.type)) {
      setAlert('Invalid file type', 'error');
      return;
    }
    setBuffer(null);
    setFile(file);
    console.log('file.name :>> ', file.name);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result);
      setBuffer(buffer);
    };
    reader.onerror = () => {
      setAlert('Failed to read file', 'error');
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box
        width='50vw'
        style={{
          backgroundColor: 'white',
          boxShadow: 24,
          borderRadius: 10,
        }}
        p={2}
        pr={6}
        pb={0}
        position='relative'
        ref={ref}
      >
        <ClickAwayListener onClick={handleClose}>
          <Box position='absolute' sx={{ top: 5, right: 5 }}>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </ClickAwayListener>
        <Box display='flex' flexDirection='column' my={1}>
          <Typography variant='h4'>Add Record</Typography>
          <Box my={2}>
            <DropzoneAreaBase
              dropzoneText='Drag and drop your file here or click to browse'
              onAdd={fileObjs => handleFileChange(fileObjs[0])}
              onDelete={fileObj => {
                setFile(null);
                setBuffer(null);
              }}
              onAlert={(message, variant) => setAlert(message, variant)}
            />
          </Box>
          <Box display='flex' justifyContent='space-between' mb={2}>
            {file && <Chip label={file.name} onDelete={() => setFile(null)} style={{ fontSize: '12px' }} />}
            <Box flexGrow={1} />
            <CustomButton
              text='Upload'
              handleClick={() => { 
                console.log('Upload button clicked');
                handleUpload(buffer, file.name, patientAddress)
                handleClose();
                }}
              disabled={!file || !buffer}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default AddRecordModal;






