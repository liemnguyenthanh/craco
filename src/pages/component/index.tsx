import Pagination from '@/components/pagination'
import { colors } from '@/constants/theme'
import { Box, Typography } from '@mui/material'

const ComponentPage = () => {
   return (
      <Box sx={{ backgroundColor: colors.white, p: 5 }}>
         <Typography color={colors.black}>Pagination</Typography>
         <Pagination
            totalItemsCount={100}
            onPageChange={(value: number) => console.log(value)}
         />
         <br/>
      </Box>
   )
}

export default ComponentPage
