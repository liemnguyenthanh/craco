import { Button } from '@mui/material'

const LogoutButton = () => {

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.reload()
  }
  return (
    <Button variant="outlined" sx={{ p: 2, width: "100%" }} onClick={handleLogout}>Logout</Button>
  )
}

export default LogoutButton
