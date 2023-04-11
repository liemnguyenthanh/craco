import { useState } from "react";
import usePageNumbers from "./usePageNumbers";

interface Props {
   totalItemsCount: number;
   onPageChange: any;
}

const DEFAULT_PAGE_SIZE = 10;

const Pagination = ({ totalItemsCount, onPageChange }: Props) => {
   const [currentPage, setCurrentPage] = useState(1);
   const totalPages = Math.ceil(totalItemsCount / DEFAULT_PAGE_SIZE);
   const renderPageNumbers = usePageNumbers(currentPage, totalPages)

   const handlePageClick = (page: number) => {
      if ( page < 1 || page > totalPages) return;
      setCurrentPage(page);
      onPageChange(page, DEFAULT_PAGE_SIZE);
   };
  
   return (
      <div className="pagination-container">
         <ul className="pagination">
            <li
               className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
               onClick={() => handlePageClick(currentPage - 1)}
            >
               &laquo;
            </li>
            {renderPageNumbers.map((page, index) => (
               <li key={index}
                  className={`pagination-item ${currentPage === page.value? 'active' : ''}`}
                  onClick={() => handlePageClick(page.value)}
               >{page.title}</li>))}
            <li
               className={`pagination-item ${currentPage === totalPages ? "disabled" : ""}`}
               onClick={() => handlePageClick(currentPage + 1)}
            >
               &raquo;
            </li>
         </ul>
      </div>
   );
};

export default Pagination;
