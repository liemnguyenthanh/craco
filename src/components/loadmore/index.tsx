
import { CircularProgress } from '@mui/material'
import { useEffect, useRef } from 'react'
import { StyledLoadMore } from './styles'

interface Props {
   isLoading: boolean
}

const LoadMoreComponent = ({ isLoading }: Props) => {
   const divRef = useRef<HTMLDivElement>()

   useEffect(() => {
      if (divRef.current) {
         divRef.current.style.height = isLoading ? divRef.current.scrollHeight + 'px' : '0'
         divRef.current.style.transition = 'height 2s'
      }
   }, [isLoading])

   return (
      <StyledLoadMore ref={divRef}>
         <CircularProgress size={20} color='success' />
      </StyledLoadMore>
   )
}

export default LoadMoreComponent
