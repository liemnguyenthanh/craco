import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { animated, useSpring } from '@react-spring/web';
import * as React from 'react';
import { StyledModal, StyledWrap } from './styles';

interface FadeProps {
   children: React.ReactElement;
   in?: boolean;
   onClick?: any;
   onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
   onExited?: (node: HTMLElement, isAppearing: boolean) => void;
   ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
   const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
   } = props;
   const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
         if (open && onEnter) {
            onEnter(null as any, true);
         }
      },
      onRest: () => {
         if (!open && onExited) {
            onExited(null as any, true);
         }
      },
   });

   return (
      <animated.div ref={ref} style={style} {...other}>
         {React.cloneElement(children, { onClick })}
      </animated.div>
   );
});

interface Props extends React.PropsWithChildren {
   isOpen: boolean,
   handleOpen: () => void,
   handleClose: () => void,
   title?: React.ReactNode,
}

const CustomModal = ({ isOpen, handleOpen, handleClose, title, children }: Props) => {

   return (
      <StyledModal>
         <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={isOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
               backdrop: {
                  TransitionComponent: Fade,
               },
            }}
         >
            <Fade in={isOpen}>
               <StyledWrap>
                  {title &&
                     <Typography id="spring-modal-title" variant="h6" component="h2">
                        {title}
                     </Typography>}
                  <Box>{children}</Box>
               </StyledWrap>
            </Fade>
         </Modal>
      </StyledModal>
   );
}

export default CustomModal