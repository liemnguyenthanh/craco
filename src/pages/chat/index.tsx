import { Grid } from "@mui/material"
import { Fragment, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { useAppDispatch } from "@/store"
import LeftChat from "./left"
import RightChat from "./right"
import HelperChat from "./HelperChat"

const ChatPage = () => {
   const dispatch = useAppDispatch()

   // FIX ME: how to get height after header render
   const heightHeaderLayout = (): string => {
      const headerLayout = document.querySelector('.js-header-layout')
      if (!headerLayout) return 'calc(100vh - 60px)'
      return `calc(100vh - ${headerLayout.clientHeight}px)`
   }

   useEffect(() => {
      dispatch({ type: 'connect' })

      return () => { dispatch({ type: 'disconnect' }) };
   }, [dispatch])

   return (
      <Fragment>
         <Grid container sx={{ height: heightHeaderLayout(), }}>
            <Grid item xs={12} sm={12} md={3}>
               <LeftChat />
            </Grid>
            <Grid item sm={12} md={9}>
               <RightChat />
            </Grid>
         </Grid>
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
