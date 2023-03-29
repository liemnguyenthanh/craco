
import { CircularProgress } from '@mui/material'
import { StyledLoading } from './styles'

const LoadingComponent = () => {
   
   return (
      <StyledLoading>
         <CircularProgress color='success'/>
      </StyledLoading>
   )
}

export default LoadingComponent
