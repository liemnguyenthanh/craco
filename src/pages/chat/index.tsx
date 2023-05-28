import ChatBackground from '@/assets/images/background_chat.png'
import { HEIGHT_MAIN } from "@/constants/chats"
import { colors } from "@/constants/theme"
import { RootState, useAppDispatch } from "@/store"
import { Box } from "@mui/material"
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { Fragment, useEffect } from "react"
import { useSelector } from 'react-redux'
import { ToastContainer } from "react-toastify"
import HelperChat from "./HelperChat"
import LeftChat from "./left"
import RightChat from "./right"

const ChatPage = () => {
   const dispatch = useAppDispatch()
   const { isOpenRoomList } = useSelector((state: RootState) => state.app)

   useEffect(() => {
      dispatch({ type: 'connect' })

      return () => { dispatch({ type: 'disconnect' }) };
   }, [dispatch])

   return (
      <Fragment>
         <StyledWrap>
            <StyledLeft className={clsx({ 'active': isOpenRoomList })} >
               <LeftChat />
            </StyledLeft>
            <StyledRight>
               <StyledChat>
                  <RightChat />
               </StyledChat>
               <StyledBackground>
                  <img src={ChatBackground} alt="" />
               </StyledBackground>
            </StyledRight>
         </StyledWrap>
         <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <ToastContainer />
         <HelperChat />
      </Fragment>
   )
}

export default ChatPage

const StyledWrap = styled(Box)(({ theme }) => ({
   display: 'flex',
   position: 'relative',
   height: HEIGHT_MAIN,

   [theme.breakpoints.up('md')]: {
      overflow: 'hidden',
   }
}))

const StyledLeft = styled(Box)(({ theme }) => ({
   minWidth: '350px',
   width: '350px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: '100%',
      position: 'absolute',
      left: 0,
      transform: `translateX(-100%)`,
      overflow: 'hidden',
      background: colors.black,
      zIndex: 9,
      transition: 'all 0.3s',

      '&.active': {
         transform: `translateX(0)`,
      }
   }
}))

const StyledRight = styled(Box)({
   position: 'relative',
   height: '100%',
   flex: 1
})

const StyledChat = styled(Box)({
   position: 'relative',
   zIndex: 2,
   height: '100%',
})

const StyledBackground = styled(Box)({
   width: '100%',
   height: '100%',
   position: 'absolute',
   top: 0,
   zIndex: 1,
   '> img': {
      height: '100%',
      width: '100%'
   }
})
