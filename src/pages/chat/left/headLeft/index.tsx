import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { StyledAction, StyledActions, StyledTitle, StyledWrap } from "./styles";

interface Props {
   handleToggleCreateRoom: () => void
}

const HeadLeft = ({ handleToggleCreateRoom }: Props) => {

   return (
      <StyledWrap>
         <StyledTitle>Chats</StyledTitle>
         <StyledActions>
            <StyledAction onClick={handleToggleCreateRoom}>
               <GroupAddIcon />
            </StyledAction>
         </StyledActions>
         {/* <FormCreateRoom /> */}
      </StyledWrap>
   )
}

export default HeadLeft