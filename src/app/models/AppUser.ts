export class AppUser{
    id:number;
    fName:string;
    lName:string;
    username:string;
    password:string;
    description:string;

    constructor(id:number, fName:string, lName:string, username:string, password:string, description:string){
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.username = username;
        this.password = password;
        this.description = description;
    }
}
