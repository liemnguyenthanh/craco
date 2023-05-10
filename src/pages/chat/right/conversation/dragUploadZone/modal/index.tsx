import CustomModal from "@/components/modal"
import { createAttachmentMessage } from "@/utils/logics/messages"
import { IAttachmentMessage } from "@/utils/types/messages"
import { Box, ImageList, ImageListItem, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"

interface Props {
   files: FileList | null
   setFiles: React.Dispatch<React.SetStateAction<FileList | null>>
   onDrop: React.DragEventHandler<HTMLDivElement> | undefined
}

const ModalUploadFile = ({ files, setFiles, onDrop }: Props) => {
   const isOpen = !!files
   const [previewImage, setPreviewImage] = useState<IAttachmentMessage[]>([])
   const handleCloseModal = () => setFiles(null)

   useEffect(() => {
      if (files) handlePreviewImage(files)
      else setPreviewImage([])
      //eslint-disable-next-line 
   }, [files])

   const handlePreviewImage = async (files: FileList) => {
      const list: IAttachmentMessage[] = []
      await Promise.all(Object.keys(files).map((key) => {
         const attachment = createAttachmentMessage(URL.createObjectURL(files[Number(key)]), files[Number(key)])
         list.push(attachment)
         return list
      }))
      setPreviewImage(list)
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // const input = event.currentTarget.message_text.value

      // const requestMessage = createRequestMessage()
   }

   if (!files || previewImage.length === 0) return <></>

   return (
      <div onDrop={onDrop}>
         <CustomModal isOpen={isOpen} handleClose={handleCloseModal} title={`Send ${files.length} Photo${files.length === 1 ? '' : 's'}`}>
            <ImageList sx={{ width: 500, maxHeight: 450 }} cols={3} rowHeight={164}>
               {previewImage.map((item, index) => (
                  <ImageListItem key={index}>
                     <img src={item.url} alt='' loading="lazy" />
                  </ImageListItem>
               ))}
            </ImageList>
            <Box component='form' onSubmit={handleSubmit}>
               <TextField name='message_text' sx={{ width: '100%' }} />
            </Box>
         </CustomModal>
      </div>
   )
}

export default ModalUploadFile
