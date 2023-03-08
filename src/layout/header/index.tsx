import { Box } from "@mui/system"
import { getMyAccount } from "../../utils/helpers"
import SearchUsers from "./searchUsers"

const HeaderLayout = () => {
  const user = getMyAccount()
  return (
    <Box
      sx={{
        borderBottom: 0.5,
        p: 2,
        borderBottomColor: 'border.main',
        height: '60px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
      className="js-header-layout"
    >
      <SearchUsers />
      <Box>
        {user && user.username}
      </Box>
    </Box>
  )
}

export default HeaderLayout
