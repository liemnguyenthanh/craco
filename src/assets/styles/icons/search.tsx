import { colors } from "@/constants/theme";

interface Props { }

const IconSearch = (props: Props) => (
   <svg
      style={{
         width: '30px',
         height: '30px',
         marginRight: '10px',
         fill: colors.whiteGrey,
      }}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <path
         d="M795.904 750.72l124.992 124.928a32 32 0 01-45.248 45.248L750.656 795.904a416 416 0 1145.248-45.248zM480 832a352 352 0 100-704 352 352 0 000 704z"
      />
   </svg>
);
export default IconSearch;