import { Popover, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useAppDispatch } from '@/store';
import { fetchUsersByName } from '@/store/slices/user';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { UsersListFilter } from './usersListFilter';
const SearchUsers: React.FC = () => {
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch()

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setPopoverAnchorEl(event.currentTarget.parentElement as HTMLDivElement);
  };

  const handleClosePopover = () => {
    setPopoverAnchorEl(null);
  };

  const pressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const value = inputRef.current?.value.trim()
      if (value) {
        dispatch(fetchUsersByName(value))
      }
    }
  }

  return (
    <>
      <TextField
        size="small"
        variant="standard"
        sx={{ width: '400px'}}
        inputRef={inputRef}
        onFocus={handleInputFocus}
        onKeyDown={pressEnter}
        InputProps={{ startAdornment: <PeopleAltIcon sx={{ mr: 1 }} />, disableUnderline: true, }}
        placeholder="Find people..." />

      <Popover
        open={!!popoverAnchorEl}
        anchorEl={popoverAnchorEl}
        onClose={handleClosePopover}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <UsersListFilter />
      </Popover>
    </>
  );
};

export default SearchUsers;
