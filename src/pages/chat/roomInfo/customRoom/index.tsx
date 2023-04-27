import CustomModal from "@/components/modal"
import { convertNicknameUser } from "@/utils/logics/rooms"
import styled from "@emotion/styled"
import { Collapse } from "@mui/material"
import { Box } from "@mui/system"
import { Fragment, useState } from "react"
import { useSelector } from "react-redux"
import TitleAndAction from "../titleAndAction"
import Nickname from "./nickname"
import { getRoomInfoActive } from "@/store/slices/chat"

const CustomRoom = () => {
   const roomInfo = useSelector(getRoomInfoActive)
   const [isCollapse, setIsCollapse] = useState(true)
   const [isOpenModal, setIsOpenModal] = useState(false)

   const handleOpenModal = () => setIsOpenModal(true)

   const handleCloseModal = () => setIsOpenModal(false)

   if (!roomInfo) return <Fragment/>
   
   return (
      <Box>
         <TitleAndAction title="Custom" titleAction="Show All" action={() => setIsCollapse(pre => !pre)} />

         <Collapse in={isCollapse} >
            <StyledList>
               <StyledItem onClick={handleOpenModal}>Nickname</StyledItem>
               {/* <StyledItem onClick={handleOpenModal}>Members</StyledItem> */}
            </StyledList>
         </Collapse>

         <CustomModal title={'Nickname'} isOpen={isOpenModal} handleOpen={handleOpenModal} handleClose={handleCloseModal}>
            <Nickname list={convertNicknameUser(roomInfo)} />
         </CustomModal>
      </Box>
   )
}

export default CustomRoom

export const StyledList = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 10
})

export const StyledItem = styled(Box)({
   cursor: 'pointer',
   width: 'fit-content',
   textDecoration: '',
})

