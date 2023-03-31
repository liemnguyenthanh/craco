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

export const getTimeMessage = (timestamp: number | undefined): string => {
   const date = convertTime(timestamp)
   if (!date) return ''
   return date?.getTimeMessage()
}

export const generalAvatar = (name: string) => {
   return `https://api.multiavatar.com/${name}.png`
}

export const handleLogout = () => {
   window.localStorage.removeItem("user");
   window.location.reload()
}

export const debounce = <F extends (...args: any[]) => void>(
   func: F,
   timeout = 300
) => {
   let timer: ReturnType<typeof setTimeout>;
   return (...args: Parameters<F>): void => {
      clearTimeout(timer);
      timer = setTimeout(() => {
         func.apply(this, args);
      }, timeout);
   };
};

export const throttle = <F extends (...args: any[]) => void>(
   func: F,
   delay = 300
 ) => {
   let timeout: ReturnType<typeof setTimeout> | undefined;
   let previousTime = 0;
 
   
   return (...args: Parameters<F>): void => {
     const currentTime = new Date().getTime();
     const elapsedTime = currentTime - previousTime;
 
     if (!timeout || elapsedTime > delay) {
       func.apply(this, args);
       previousTime = currentTime;
     } else {
       clearTimeout(timeout);
       timeout = setTimeout(() => {
         func.apply(this, args);
         previousTime = new Date().getTime();
       }, delay - elapsedTime);
     }
   };
 };
 