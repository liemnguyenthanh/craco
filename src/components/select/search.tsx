import SearchUsers from '@/layout/header/searchUsers';
import { RootState } from '@/store';
import { UserAccount } from '@/utils/types/accounts';
import { Checkbox, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingComponent from '../loading';

interface Props {
   setValue: (values: string[]) => void
}

const SelectSearch = ({ setValue }: Props) => {
   const { usersByName, isFetchingUsers } = useSelector((state: RootState) => state.user)
   const [selected, setSelected] = useState<string[]>([]);
   const [userSelected, setUserSelected] = useState<UserAccount[]>([]);

   const handleChange = (event: SelectChangeEvent<any>, node: any) => {
      const value = node.props.value;
      const user = usersByName.find(user => user._id === value)
      let newSelected = [...selected]
      let newUserSelected = [...userSelected]
      if (!selected.includes(value) && user) {
         newSelected.push(value)
         newUserSelected.push(user)
      } else {
         newSelected = newSelected.filter(select => select !== value)
         newUserSelected = newUserSelected.filter(select => select._id !== value)
      }
      setSelected(newSelected);
      setUserSelected(newUserSelected)
      setValue(newSelected)
   };

   return (
      <Fragment>
         <Box sx={{ border: 1, borderRadius: 1, }}>
            <SearchUsers />
         </Box>
         <Select
            labelId="multiple-select-label"
            multiple
            value={selected}
            onChange={handleChange}
            renderValue={() => userSelected.map(user => user.username).join(', ')}
            sx={{ width: '100%' }}
         >
            {isFetchingUsers && <LoadingComponent />}
            {!isFetchingUsers && (
               usersByName.length === 0 ? <Box>Not Found</Box> :
                  usersByName.map((option: UserAccount) => (
                     <MenuItem key={option._id} value={option._id}>
                        <ListItemIcon>
                           <Checkbox checked={selected.indexOf(option._id) > -1} />
                        </ListItemIcon>
                        <ListItemText primary={option.username} />
                     </MenuItem>
                  )
                  ))}
         </Select>
      </Fragment>
   )
}

export default SelectSearch