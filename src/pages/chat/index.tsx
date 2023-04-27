import LoadingComponent from "@/components/loading"
import { colors } from "@/constants/theme"
import { useAppDispatch } from "@/store"
import styled from "@emotion/styled"
import { Box } from "@mui/material"
import React, { Fragment, Suspense, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import HelperChat from "./HelperChat"
import RightChat from "./right"


const Events = React.lazy(() => import('./left'));

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
         <StyledWrap sx={{ height: 'calc(100dvh - 60px)' }}>
            <StyledLeft className='js-room-list' onTransitionEnd={handleTransitionEnd}>
               <Suspense fallback={<LoadingComponent />}>
                  <Events />
               </Suspense>
            </StyledLeft>
            <StyledRight>
               <RightChat />
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

const StyledWrap = styled(Box)({
   display: 'flex',
   position: 'relative',

})

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
   flex: 1
})

