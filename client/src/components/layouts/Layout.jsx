
import { AppBar, Chip, Toolbar, Box, Typography } from '@mui/material';
import React from 'react';
import useEth from '../../contexts/EthContext/useEth';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import logo from '../../assets/tealNoBG-cropped.png';
import { grey, teal } from '@mui/material/colors';

const HeaderAppBar = () => {
  const {
    state: { accounts, role },
  } = useEth();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <a href="/">
            <img src={logo} alt="med-chain-logo" style={{ height: 40 }} />
          </a>
          <Box flexGrow={1} />
          <Box display="flex" alignItems="center">
            <PersonRoundedIcon sx={{ color: grey[700], fontSize: '28px', marginRight: 1 }} />
            <Typography variant="h6" color="textPrimary" sx={{ marginRight: 2 }}>
              {accounts ? accounts[0] : 'Wallet not connected'}
            </Typography>
            <Chip
              label={role === 'unknown' ? 'not registered' : role}
              sx={{ fontSize: '14px', backgroundColor: teal['A700'], color: 'white' }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;
