/* eslint-disable react-hooks/exhaustive-deps */
import { ListItem } from "@mui/material";
import { useEffect, useRef } from "react";
import { IMessage } from "@/utils/types/messages";
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
   }, []);

   return (
      <ListItem
         sx={styles.message(isMe)}
         ref={itemRef}>
         {message.message_text}
      </ListItem>
   )
}

export default ItemMessageUser
