import LoadingComponent from "@/components/loading"
import { useAppDispatch } from "@/store"
import { Grid } from "@mui/material"
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

   return (
      <Fragment>
         <Grid container sx={{ height: 'calc(100vh - 60px)' }}>
            <Grid item xs={12} sm={12} md={3}>
               <Suspense fallback={<LoadingComponent />}>
                  <Events />
               </Suspense>
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
