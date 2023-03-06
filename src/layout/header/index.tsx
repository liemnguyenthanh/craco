import { Box } from "@mui/system"

const HeaderLayout = () => {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      borderBottom: 1,
      p: 2,
      borderBottomColor: 'border.primary',
      height: '60px',
      width: '100%'
    }}
      className="js-header-layout"
    >
      search people!!
    </Box>
  )
}

export default HeaderLayout
