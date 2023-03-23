import multiavatar from "@multiavatar/multiavatar";

export const getMyAccount = () => {
   return getItemLocalStorage('user')
}

export function getItemLocalStorage(key: string) {
   const value = localStorage.getItem(key);

   if (!value) return null;

   return JSON.parse(value);
}


export const last = (list: any[]) => {
   if (list.length === 0) return
   return list[list.length - 1]
}

export const convertTimeToDate = (timestamp: number) => {
   const date = new Date(timestamp);

   const day = String(date.getDate()).padStart(2, '0');
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const year = date.getFullYear();
   const hours = date.getHours();
   const minutes = String(date.getMinutes()).padStart(2, '0');
   const amPm = hours >= 12 ? 'PM' : 'AM';
   const formattedHours = hours % 12 || 12;

   return { date, hours, minutes, day, month, year, amPm, formattedHours }
}

export const convertTime = (timestamp: number | undefined) => {
   if (!timestamp) return null
   const { minutes, day, month, year, amPm, formattedHours } = convertTimeToDate(timestamp)

   return {
      getTimeMessage: () => {
         return `${formattedHours}:${minutes} ${amPm}`
      },
      getDayMonthYear: (fortmat?: string) => {
         return `${day}-${month}-${year}`
      }
   }
}
export const moveItemToFront = <T>(arr: T[], item: T) => {
   const index = arr.indexOf(item);
   if (index === 0) return;
   if (index !== -1) {
      arr.splice(index, 1);
      arr.unshift(item);
   }
   return arr;
}

// export const mergeUsersMessages = (newList: IMessage[], list: IGroupMessageByType[], isLoadMore = false) => {
//   if (isLoadMore) newList = newList.reverse()
//   const element = isLoadMore ? list[0] : last(list)
//   const newListCopy = [...newList]

//   for (let index = 0; index < newList.length; index++) {
//     if (newList[index].sender_id === element.user?.username && element.message_group) {
//       newListCopy.splice(0, 1)
//       element.message_group = isLoadMore ? [newList[index], ...element.message_group] : [...element.message_group, newList[index]]
//     } else break;
//   }

//   if (newListCopy.length > 0)
//     list = isLoadMore ? 
//       convertUsersMessages(newListCopy).concat(list) : 
//       list.concat(convertUsersMessages(newListCopy))

//   return list
// }
export const getTimeMessage = (timestamp: number | undefined): string => {
   const date = convertTime(timestamp)
   if (!date) return ''
   return date?.getTimeMessage()
}

export const generalAvatar = (name: string) => {
   return `https://api.multiavatar.com/${name}.png`
}