import { Button } from '@mui/material'

const LogoutButton = () => {

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.location.reload()
  }
  return (
    <Button
      sx={{
        p: 2, width: "100%",
        color: "text.primary",
        borderTop: 0.5, borderColor: "border.main"
      }} onClick={handleLogout}>Logout</Button>
  )
}

export default LogoutButton
