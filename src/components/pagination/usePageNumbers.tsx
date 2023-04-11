import { useMemo } from 'react'

interface IPageItem {
   title: string | number
   value: number
}

const DEFAULT_PAGE_RANGE_DISPLAYED = 5;
const createPageItem = (title: string | number, value: number): IPageItem => ({ title, value })

const usePageNumbers = (currentPage: number, totalPages: number) => {
   const pageRangeDisplayed = Math.min(
      DEFAULT_PAGE_RANGE_DISPLAYED,
      totalPages
   );


   const renderPageNumbers = useMemo(() => {
      const pageNumbers: IPageItem[] = [];
      const leftGap = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2))
      const rightGap = Math.min(totalPages, currentPage + Math.floor(pageRangeDisplayed / 2))

      const push = (item: IPageItem) => pageNumbers.push(item)

      if (leftGap > 1) push(createPageItem('1', 1))
      if (leftGap > 2) push(createPageItem('...', currentPage - pageRangeDisplayed))

      for (let index = leftGap; index <= rightGap; index++) {
         push(createPageItem(index, index))
      }

      if (rightGap < totalPages - 1) push(createPageItem('...', currentPage + pageRangeDisplayed))
      if (rightGap < totalPages) push(createPageItem(totalPages, totalPages))
      return pageNumbers
      // eslint-disable-next-line
   }, [currentPage]);

   return renderPageNumbers
}

export default usePageNumbers

