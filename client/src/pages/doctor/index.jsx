
import React, { useState, useCallback } from 'react';
import { Box, Divider, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import useEth from '../../contexts/EthContext/useEth';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import useAlert from '../../contexts/AlertContext/useAlert';
import AddRecordModal from './AddRecordModal';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import addFileToPinata from '../../ipfs';
import Record from '../../components/Record';
import DialogContent from '@mui/material/DialogContent';

const Doctor = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth();
  const { setAlert } = useAlert();

  const [patientExist, setPatientExist] = useState(false);
  const [searchPatientAddress, setSearchPatientAddress] = useState('');
  const [addPatientAddress, setAddPatientAddress] = useState('');
  const [records, setRecords] = useState([]);
  const [addRecord, setAddRecord] = useState(false);

  const searchPatient = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(searchPatientAddress)) {
        setAlert('Please enter a valid wallet address', 'error');
        return;
      }
      const patientExists = await contract.methods.getPatientExists(searchPatientAddress).call({ from: accounts[0] });
      if (patientExists) {
        const records = await contract.methods.getRecords(searchPatientAddress).call({ from: accounts[0] });
        setRecords(records);
        setPatientExist(true);
      } else {
        setAlert('Patient does not exist', 'error');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const registerPatient = async () => {
    try {
      await contract.methods.addPatient(addPatientAddress).send({ from: accounts[0] });
      setAlert('Patient registered successfully', 'success');
    } catch (err) {
      console.error(err);
      setAlert('Registration failed', 'error');
    }
  };

  const addRecordCallback = useCallback(
    async (file, fileName, patientAddress) => {
      if (!patientAddress) {
        setAlert('Please search for a patient first', 'error');
        return;
      }

      try {
        const ipfsHash = await addFileToPinata(file);
        if (ipfsHash) {
          await contract.methods.addRecord(ipfsHash, fileName, patientAddress).send({ from: accounts[0], gas: 900000 });
          setAlert('New record uploaded', 'success');
          setAddRecord(false);

          const updatedRecords = await contract.methods.getRecords(patientAddress).call({ from: accounts[0], gas: 900000 });
          setRecords(updatedRecords);
        }
      } catch (err) {
        setAlert('Record upload failed', 'error');
        console.error(err);
      }
    },
    [contract, accounts, setAlert]
  );

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box display="flex" justifyContent="center" width="100vw">
      <Box width="60%" my={5}>
        {!accounts ? (
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">
              Open your MetaMask wallet to get connected, then refresh this page
            </Typography>
          </Box>
        ) : (
          <>
            {role === 'unknown' && (
              <Box display="flex" justifyContent="center">
                <Typography variant="h5">You're not registered, please go to home page</Typography>
              </Box>
            )}
            {role === 'patient' && (
              <Box display="flex" justifyContent="center">
                <Typography variant="h5">Only doctor can access this page</Typography>
              </Box>
            )}
            {role === 'doctor' && (
              <>
                <Modal open={addRecord} onClose={() => setAddRecord(false)} disableEnforceFocus>
                  <DialogContent>
                    <AddRecordModal
                      handleClose={() => setAddRecord(false)}
                      handleUpload={addRecordCallback}
                      patientAddress={searchPatientAddress}
                    />
                  </DialogContent>
                </Modal>

                <Typography variant="h4">Patient Records</Typography>
                <Box display="flex" alignItems="center" my={1}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      placeholder="Search patient by wallet address"
                      value={searchPatientAddress}
                      onChange={(e) => setSearchPatientAddress(e.target.value)}
                      InputProps={{ style: { fontSize: '15px' } }}
                      InputLabelProps={{ style: { fontSize: '15px' } }}
                      size="small"
                    />
                  </FormControl>
                  <Box mx={2}>
                    <CustomButton text="Search" handleClick={searchPatient}>
                      <SearchRoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                  </Box>
                  <CustomButton
                    text="New Record"
                    handleClick={() => setAddRecord(true)}
                    disabled={!patientExist}
                  >
                    <CloudUploadRoundedIcon style={{ color: 'white' }} />
                  </CustomButton>
                </Box>

                {patientExist && records.length === 0 && (
                  <Box display="flex" alignItems="center" justifyContent="center" my={5}>
                    <Typography variant="h5">No records found</Typography>
                  </Box>
                )}

                {patientExist && records.length > 0 && (
                  <Box display="flex" flexDirection="column" mt={3} mb={-2}>
                    {records.map((record, index) => (
                      <Box mb={2} key={index}>
                        <Record record={record} />
                      </Box>
                    ))}
                  </Box>
                )}

                <Box mt={6} mb={4}>
                  <Divider />
                </Box>

                <Typography variant="h4">Register Patient</Typography>
                <Box display="flex" alignItems="center" my={1}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      placeholder="Register patient by wallet address"
                      value={addPatientAddress}
                      onChange={(e) => setAddPatientAddress(e.target.value)}
                      InputProps={{ style: { fontSize: '15px' } }}
                      InputLabelProps={{ style: { fontSize: '15px' } }}
                      size="small"
                    />
                  </FormControl>
                  <Box mx={2}>
                    <CustomButton 
                    text="Register" 
                    handleClick={registerPatient}
                    >
                      <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                  </Box>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Doctor;
