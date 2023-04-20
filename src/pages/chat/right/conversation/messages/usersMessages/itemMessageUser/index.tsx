import { generalAvatar } from "@/utils/helpers";
import { getShowNameUserInRoom } from "@/utils/logics/rooms";
import { IMessage } from "@/utils/types/messages";
import { IRoom } from "@/utils/types/rooms";
import styled from "@emotion/styled";
import { Avatar, AvatarGroup, Box, Tooltip } from "@mui/material";
import { Fragment, useEffect, useRef } from "react";
import { styles } from "../styles";
interface Props {
   message: IMessage,
   isMe: boolean
   roomInfo: IRoom
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>
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
            {message.message_text}
         </Box>
         {roomInfo.last_messages_seen_by &&
            roomInfo.last_messages_seen_by[message._id]?.length > 0 &&
            <AvatarGroup max={20}>
               {roomInfo.last_messages_seen_by[message._id].map(user_id =>
                  <Tooltip title={getShowNameUserInRoom(roomInfo, user_id)} key={user_id} >
                     <StyledAvatar alt="asd" src={generalAvatar(user_id)} />
                  </Tooltip>)}
            </AvatarGroup>
         }
      </Fragment>
   )
}

export default ItemMessageUser

const StyledAvatar = styled(Avatar)({
   width: 20,
   height: 20
})