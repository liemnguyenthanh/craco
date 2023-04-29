import LoadingComponent from "@/components/loading"
import { colors } from "@/constants/theme"
import { useAppDispatch } from "@/store"
import styled from "@emotion/styled"
import { Box } from "@mui/material"
import React, { Fragment, Suspense, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import HelperChat from "./HelperChat"
import RightChat from "./right"
import { HEIGHT_MAIN } from "@/constants/chats"
import ChatBackground from '@/assets/images/background_chat.png';

const LeftChat = React.lazy(() => import('./left'));

const ChatPage = () => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch({ type: 'connect' })

      return () => { dispatch({ type: 'disconnect' }) };
   }, [dispatch])

   const handleTransitionEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
      if (!event.currentTarget) return;
      event.currentTarget.removeAttribute('style')
   }

   return (
      <Fragment>
         <StyledWrap>
            <StyledLeft className='js-room-list' onTransitionEnd={handleTransitionEnd}>
               <Suspense fallback={<LoadingComponent />}>
                  <LeftChat />
               </Suspense>
            </StyledLeft>
            <StyledRight>
               <StyledChat>
                  <RightChat />
               </StyledChat>
               <StyledBackground>
                  <img src={ChatBackground} alt=""/>
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

const StyledWrap = styled(Box)(({ theme }: any) => ({
   display: 'flex',
   position: 'relative',
   height: HEIGHT_MAIN,
   [theme.breakpoints.up('md')]: {
      overflow: 'hidden',
   }
}))

const StyledLeft = styled(Box)(({ theme }: any) => ({
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
   zIndex: 2
})

const StyledBackground = styled(Box)({
   width: '100%',
   height: '100%',
   position:'absolute',
   top: 0,
   zIndex: 1,
   '> img': {
      height: '100%',
   }
})
