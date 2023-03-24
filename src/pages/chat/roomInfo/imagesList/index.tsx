import { colors } from '@/constants/theme'
import { generalAvatar } from '@/utils/helpers'
import { ImageList, ImageListItem } from '@mui/material'
import TitleAndAction from '../titleAndAction'
import { StyledImageWrap } from './styles'

const ImagesList = () => {

   const handleLoadMore = () => { }
   return (
      <StyledImageWrap>
         <TitleAndAction title='Images' titleAction='Show All' action={handleLoadMore} />
         <ImageList sx={{ width: '100%' }} cols={5} rowHeight={70}>
            {Array.from({ length: 5 }, (_, index) =>
               <ImageListItem key={index} sx={{ background: colors.blackLight, borderRadius: 2 }} >
                  <img
                     src={generalAvatar(index.toString())}
                     alt=''
                     loading="lazy"
                  />
               </ImageListItem>
            )}
         </ImageList>
      </StyledImageWrap>
   )
}

export default ImagesList
