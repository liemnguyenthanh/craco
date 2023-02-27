import { Grid } from "@mui/material"
import { Fragment, useEffect } from "react"
import { useAppDispatch } from "../../store"
import RoomList from "./left/roomList"
import Notification from "./notification"
import RoomMain from "./right/roomMain"

const ChatPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({ type: 'connect' })

    return () => { dispatch({ type: 'disconnect' }) };
  }, [dispatch])

  return (
    <Fragment>
      <Grid container sx={{ p: 2 }} spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} sm={12} md={3}>
          <RoomList />
        </Grid>
        <Grid item sm={12} md={9}>
          <RoomMain />
        </Grid>
      </Grid>
      <Notification />
    </Fragment>
  )
}

export default ChatPage
