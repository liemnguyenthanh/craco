import CustomModal from "@/components/modal"
import { RootState } from "@/store"
import { convertNicknameUser } from "@/utils/logics/rooms"
import styled from "@emotion/styled"
import { Collapse } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useSelector } from "react-redux"
import TitleAndAction from "../titleAndAction"
import Nickname from "./nickname"

const CustomRoom = () => {
   const { roomIdActive, roomInfoList } = useSelector((state: RootState) => state.chat)
   const [isCollapse, setIsCollapse] = useState(false)
   const [isOpenModal, setIsOpenModal] = useState(false)

   const handleOpenModal = () => setIsOpenModal(true)

   const handleCloseModal = () => setIsOpenModal(false)

   return (
      <div>
         <TitleAndAction title="Custom" titleAction="Show All" action={() => setIsCollapse(pre => !pre)} />

         <Collapse in={isCollapse} >
            <StyledList>
               <StyledItem onClick={handleOpenModal}>Nickname</StyledItem>
            </StyledList>
         </Collapse>
         <CustomModal title={'Nickname'} isOpen={isOpenModal} handleOpen={handleOpenModal} handleClose={handleCloseModal}>
            <Nickname list={convertNicknameUser(roomInfoList[roomIdActive])}/>
         </CustomModal>
      </div>
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

