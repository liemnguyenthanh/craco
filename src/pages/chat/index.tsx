import LoadingComponent from "@/components/loading"
import { SELECTOR } from "@/constants/selectors"
import { useAppDispatch } from "@/store"
import { Grid } from "@mui/material"
import React, { Fragment, Suspense, useEffect, useMemo } from "react"
import { ToastContainer } from "react-toastify"
import HelperChat from "./HelperChat"
import RightChat from "./right"
const Events = React.lazy(() => import('./left'));

const ChatPage = () => {
   const dispatch = useAppDispatch()

   const heightHeaderLayout = useMemo((): string => {
      const headerLayout = document.querySelector(SELECTOR.HEADER)
      if (!headerLayout) return 'calc(100vh - 60px)'
      return `calc(100vh - ${headerLayout.clientHeight}px)`
   }, [])

   useEffect(() => {
      dispatch({ type: 'connect' })

      return () => { dispatch({ type: 'disconnect' }) };
   }, [dispatch])

   return (
      <Fragment>
         <Grid container sx={{ height: heightHeaderLayout, }}>
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
