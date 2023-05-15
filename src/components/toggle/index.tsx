import { PropsWithChildren, useEffect, useState } from 'react'

interface Props extends PropsWithChildren {
   isToggle: boolean
}
/*
   - mount: opacity
   - unmount: opacity
*/
const ToggleWithAnimation = ({ isToggle, children }: Props) => {
   const [isOpen, setIsOpen] = useState(isToggle)

   useEffect(() => {
   }, [isToggle])
   
   return (
      <div>
         {children}
      </div>
   )
}

export default ToggleWithAnimation
