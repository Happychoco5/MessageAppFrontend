import { AppUser } from "./AppUser";
import { Friend } from "./Friend";

export class FriendList{
    appUser:AppUser;
    friend:Friend;

    constructor(appUser:AppUser, friend:Friend){
        this.appUser = appUser;
        this.friend = friend;
    }
}