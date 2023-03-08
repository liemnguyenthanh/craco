import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import { Popper, TextField } from '@mui/material'
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useClickOutSide';
import { useAppDispatch } from '../../../store';
import { fetchUsersByName } from '../../../store/slices/users';
import { UsersListFilter } from './usersListFilter';

const ID_SEARCH_POPPER = "Sj12-n4i2-2412"
const SearchUsers = () => {
  const [openUsers, setOpenUsers] = useState<boolean>(false)
  const inputRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  useOnClickOutside(inputRef, () => setOpenUsers(false))

  const pressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
  if (event.key === 'Enter') {
    const input = inputRef.current?.querySelector('input')
    if (input?.value.trim()) {
      dispatch(fetchUsersByName(input.value.trim()))
    }
  }
}

return (
  <Box>
    <TextField
      ref={inputRef}
      size="small"
      variant="standard"
      sx={{
        width: '400px',
      }}
      onFocus={() => setOpenUsers(true)}
      onKeyDown={pressEnter}
      InputProps={{ startAdornment: <PeopleAltSharpIcon sx={{ mr: 1 }} />, disableUnderline: true, }}
      placeholder="Find people..."
      aria-describedby={ID_SEARCH_POPPER}
    />
    <Popper
      id={ID_SEARCH_POPPER}
      open={openUsers} anchorEl={inputRef.current}
      placement='bottom-start'>
      <UsersListFilter />
    </Popper>
  </Box>
)
}

export default SearchUsers
