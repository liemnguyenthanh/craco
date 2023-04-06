import { IMessage } from "@/utils/types/messages";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { styles } from "../styles";
interface Props {
   message: IMessage,
   isMe: boolean
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>
}

const ItemMessageUser = ({ message, isMe, messageListRef }: Props) => {
   const itemRef = useRef<HTMLLIElement>(null);

   useEffect(() => {
      messageListRef.current.push(itemRef);
      // eslint-disable-next-line
   }, []);

   return (
      <Box
         sx={styles.message(isMe)}
         ref={itemRef}>
         {message.message_text}
      </Box>
   )
}

export default ItemMessageUser
