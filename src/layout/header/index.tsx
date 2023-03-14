import styled from "@emotion/styled"
import { Box } from "@mui/system"
import { colors } from "@/constants/theme"
import { getMyAccount } from "@/utils/helpers"
import SearchUsers from "./searchUsers"

const HeaderLayout = () => {
  const user = getMyAccount()
  return (
    <Wrap className="js-header-layout">
      <SearchUsers />
      <Box>
        {user && user.username}
      </Box>
    </Wrap>
  )
}

export default HeaderLayout

const Wrap = styled(Box)({
  borderBottom: `1px solid ${colors.whiteDark}`,
  padding: 16,
  borderBottomColor: 'border.main',
  height: '60px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})
