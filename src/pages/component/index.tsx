import Pagination from '@/components/pagination'

const ComponentPage = () => {
   return (
      <div>
         <Pagination
            totalItemsCount={100}
            onPageChange={(value: number) => console.log(value)}
         />
      </div>
   )
}

export default ComponentPage
