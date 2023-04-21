import { Box } from "@mui/system"
import { colors } from "@/constants/theme"
import { generalAvatar, getCurrentUser, handleLogout } from "@/utils/helpers"
import { SELECTOR } from "@/constants/selectors"
import { Avatar, Button } from "@mui/material"
import SearchUsers from "./searchUsers"
import styled from "@emotion/styled"
import ListIcon from '@mui/icons-material/List';

const HeaderLayout = () => {
   const user = getCurrentUser()

   const handleToggleList = () => {
      const roomListSelector: HTMLDivElement | null = document.querySelector(SELECTOR.ROOM_LIST)
      if (!roomListSelector) return;

      roomListSelector.style.transition = 'all 0.3s'
      roomListSelector.classList.toggle('active')
   }

   return (
      <StyledWrap className="js-header-layout">
         <StyleLeft>
            <StyledButtonShow onClick={handleToggleList}><ListIcon /></StyledButtonShow>
            <SearchUsers hasPopover={true} />
         </StyleLeft>
         {
            user &&
            <StyledInfo>
               <Button onClick={handleLogout}>Out</Button>

               <Avatar src={generalAvatar(user._id)} />
               {user.username}
            </StyledInfo>
         }
      </StyledWrap>
   )
}

export default HeaderLayout

const StyledWrap = styled(Box)({
   borderBottom: `1px solid ${colors.whiteDark}`,
   padding: 16,
   borderBottomColor: 'border.main',
   height: '60px',
   width: '100%',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
})

const StyledInfo = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 10
})

const StyleLeft = styled(Box)({
   display: 'flex',
})

const StyledButtonShow = styled(Button)(({ theme }: any) => ({
   display: 'none',
   padding: 2,
   minWidth: 40,
   minHeight: 35,
   borderRadius: '50%',
   textAlign: 'center',
   backgroundColor: colors.green,
   transition: 'transform 0.3s',
   zIndex: 10,

   "&:hover": {
      transform: 'scale(1.3)',
      backgroundColor: colors.green,
   },

   [theme.breakpoints.down('md')]: {
      display: 'flex'
   }
}))
