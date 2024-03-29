import IconSearch from '@/assets/styles/icons/search';
import { useAppDispatch } from '@/store';
import { fetchUsersByName } from '@/store/slices/user';
import { Popover } from '@mui/material';
import React, { Fragment, useRef, useState } from 'react';
import { StyledSearch } from './styles';
import { UsersListFilter } from './usersListFilter';

interface Props {
   hasPopover?: boolean
}

const SearchUsers: React.FC<Props> = ({ hasPopover }) => {
   const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLDivElement | null>(null);
   const inputRef = useRef<HTMLInputElement | null>(null);
   const dispatch = useAppDispatch()

   const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setPopoverAnchorEl(event.currentTarget.parentElement as HTMLDivElement);
   };

   const handleClosePopover = () => setPopoverAnchorEl(null);

   const pressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
         const value = inputRef.current?.value.trim()
         if (value) dispatch(fetchUsersByName(value))
      }
   }

   return (
      <Fragment>
         <StyledSearch
            size="small"
            inputRef={inputRef}
            onFocus={handleInputFocus}
            onKeyDown={pressEnter}
            InputProps={{ startAdornment: <IconSearch /> }}
            placeholder="Find people..." />

         {hasPopover &&
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
            </Popover>}

      </Fragment>
   );
};

export default SearchUsers;
