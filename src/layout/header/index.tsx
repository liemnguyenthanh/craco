import styled from "@emotion/styled"
import { Box } from "@mui/system"
import { colors } from "@/constants/theme"
import { generalAvatar, getCurrentUser, handleLogout } from "@/utils/helpers"
import SearchUsers from "./searchUsers"
import { Avatar, Button } from "@mui/material"

const HeaderLayout = () => {
   const user = getCurrentUser()
   return (
      <StyledWrap className="js-header-layout">
         <SearchUsers hasPopover={true}/>
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
   gap: '10px'
})