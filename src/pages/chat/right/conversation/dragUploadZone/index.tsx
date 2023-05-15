
import { SELECTOR } from '@/constants/selectors'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React, { PropsWithChildren, useRef, useState } from 'react'
import ModalUploadFile from './modal'

interface Props extends PropsWithChildren { }

const DragUploadZone = ({ children }: Props) => {
   const [isShowUpload, setIsShowUpload] = useState(false)
   const [filesUpload, setFilesUpload] = useState<FileList | null>(null)
   const preIsShow = useRef(false)

   const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const isShow = event.type === 'dragover'

      if (preIsShow.current === isShow) return

      setIsShowUpload(isShow)
      preIsShow.current = isShow
      const uploadSelector = document.querySelector(SELECTOR.UPLOAD_FILE)

      if (!uploadSelector) return;

      uploadSelector.classList.toggle('active', uploadSelector.contains(event.target as Node))
   }

   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsShowUpload(false)
      setFilesUpload(event.dataTransfer.files)
   }

   return (
      <Box
         id='drag-zone'
         onDragOver={onDragOver}
         onDragLeave={onDragOver}
      >
         {children}
         {
            isShowUpload &&
            <StyledUploadFile onDrop={handleDrop}>
               <StyledDropZone className='js-upload-file'>
                  <p>Kéo thả file zô đây bờ ro!!</p>
               </StyledDropZone>
            </StyledUploadFile>
         }
         {filesUpload && <ModalUploadFile files={filesUpload} setFiles={setFilesUpload} onDrop={handleDrop} />}
      </Box>
   )
}

export default DragUploadZone

const StyledUploadFile = styled('div')`
   position: absolute;
   top: 50%;
   left: 50%;
   translate: -50% -50%;
   z-index: 200;
   height: 70%;
   width: 70%;
   animation: fade 0.8s;
   animation-timing-function: ease;

   @keyframes fade {
      0% { opacity: 0 }   
      100% { opacity: 1 }   
   }
`

const StyledDropZone = styled('div')`
   --border-size: 5px;
   --border-angle: 0turn;
   position: relative;
   height: inherit;

   display: flex;
   align-items: center;
   justify-content: center;

   text-align: center;
   border-radius: 5px;

   background-size: calc(100% - (var(--border-size) * 2)) calc(100% - (var(--border-size) * 2)), cover;
   background-position: center center;
   background-repeat: no-repeat;
   background-image: conic-gradient(from var(--border-angle),#213,#112 50%,#213),
            conic-gradient(#cfc, #ccc, #fff);


   &.active {
      animation: bg-spin 3s linear infinite;
      background-image: conic-gradient(from var(--border-angle),#213,#112 50%,#213),
            conic-gradient(from var(--border-angle), transparent 20%, #08f, #f03);

      @keyframes bg-spin {
        to {
          --border-angle: 1turn;
        }
      }

      @property --border-angle {
         syntax: "<angle>";
         inherits: true;
         initial-value: 0turn;
      }
   }
`