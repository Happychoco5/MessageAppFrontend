export class Friend{
    id:number;
    userid:number;
    friend_id:number;
    status:string;

    constructor(id:number, userid:number, friend_id:number, status:string){
        this.id = id;
        this.userid = userid;
        this.friend_id = friend_id;
        this.status = status;
    }
}