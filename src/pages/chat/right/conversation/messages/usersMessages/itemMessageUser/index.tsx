import { generalAvatar } from "@/utils/helpers";
import { getShowNameUserInRoom } from "@/utils/logics/rooms";
import { EMessageStatus, IMessage } from "@/utils/types/messages";
import { IRoom } from "@/utils/types/rooms";
import styled from "@emotion/styled";
import { Avatar, AvatarGroup, Box, Tooltip } from "@mui/material";
import { Fragment, useEffect, useRef } from "react";
import { styles } from "../styles";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ErrorIcon from '@mui/icons-material/Error';
interface Props {
   message: IMessage,
   isMe: boolean
   roomInfo: IRoom
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>
}

const IconStatus = {
   [EMessageStatus.SENDING]: <DataUsageIcon />,
   [EMessageStatus.SENT]: <TaskAltIcon />,
   [EMessageStatus.RECEIVE]: <OfflinePinIcon />,
   [EMessageStatus.ERROR]: <ErrorIcon />,
}

const ItemMessageUser = ({ message, isMe, roomInfo, messageListRef }: Props) => {
   const itemRef = useRef<HTMLLIElement>(null);

   useEffect(() => {
      messageListRef.current.push(itemRef);
      // eslint-disable-next-line
   }, []);

   return (
      <Fragment>
         <Box
            sx={styles.message(isMe)}
            ref={itemRef}>
            <StyledStatusMessage>
               {IconStatus[message.message_status]}
            </StyledStatusMessage>
            {message.message_text}
         </Box>
         {message._id &&
            roomInfo.last_messages_seen_by &&
            roomInfo.last_messages_seen_by[message._id]?.length > 0 &&
            <AvatarGroup max={20}>
               {roomInfo.last_messages_seen_by[message._id].map(user_id =>
                  <Tooltip title={getShowNameUserInRoom(roomInfo, user_id)} key={user_id} >
                     <StyledAvatar alt="asd" src={generalAvatar(user_id)} />
                  </Tooltip>)}
            </AvatarGroup>}
      </Fragment>
   )
}

export default ItemMessageUser

const StyledAvatar = styled(Avatar)({
   width: 20,
   height: 20
})

const StyledStatusMessage = styled(Box)`
   position: absolute;
   right: -18px;

   > svg {
      width: 14px;
      height: 14px
   }
`