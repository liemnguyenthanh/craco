import { UserAccount } from "./accounts";

export interface UserSlice {
   isFetchingUsers: boolean
   usersByName: UserAccount[]
}
