import { colors } from "@/constants/theme"
import { useAppDispatch } from "@/store"
import { fetchUsersByName } from "@/store/slices/user"
import { generalAvatar } from "@/utils/helpers"
import styled from "@emotion/styled"
import { Avatar } from "@mui/material"
import { Box } from "@mui/system"

interface Props {
   usersSelected: any[],
   handleUnSelected: (index: number) => void
}

const SearchUser = ({ usersSelected, handleUnSelected }: Props) => {
   const dispatch = useAppDispatch()

   const handleClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
      const element = event.currentTarget
      element.classList.add('user-selected--remove')
      setTimeout(() => {
         handleUnSelected(index)
      }, 500);
   }

   const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         const value = event.currentTarget.value.trim()
         if (value) dispatch(fetchUsersByName(value))
         event.currentTarget.value = ''
         event.currentTarget.blur()
      }
   }

   return (
      <StyledWrap>
         {usersSelected.length > 0 &&
            usersSelected.map((item, index) =>
               <StyledInfo
                  key={item._id}
                  className="user-selected"
                  onClick={(event) => handleClick(event, index)}>
                  <Avatar className="user-selected__img" src={generalAvatar(item._id)} sx={{ width: 35, height: 35 }} alt='info' />
                  <StyledInfoName>{item.username}</StyledInfoName>
               </StyledInfo>)}
         <StyledInput placeholder="Add people..." onKeyDown={onPressEnter} />
      </StyledWrap>
   )
}

export default SearchUser

export const StyledWrap = styled(Box)({
   display: 'flex',
   gap: 10,
   flexWrap: 'wrap',
})

export const StyledInfoName = styled('span')({
   fontSize: 14,
   overflow: 'hidden',
   whiteSpace: 'nowrap',
   textOverflow: 'ellipsis'
})

export const StyledInfo = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 5,
   maxWidth: 250,
   paddingRight: 10,
   borderRadius: 30,
   backgroundColor: colors.blackLight,
   cursor: 'pointer',
})

export const StyledInput = styled('input')({
   border: 'none',
   outline: 'none',
   padding: '8px 4px',
   backgroundColor: 'inherit',
   flex: 1,
   fontSize: 16,
   color: colors.white
})

