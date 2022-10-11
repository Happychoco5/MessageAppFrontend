export class Message{
    messageId:number;
    sender:number;
    receiver:number;
    epochTime:number;
    contents:string;

    constructor(messageId:number, sender:number, receiver:number, epochTime:number, contents:string){
        this.messageId = messageId;
        this.sender = sender;
        this.receiver = receiver;
        this.epochTime = epochTime;
        this.contents = contents;
    }
}
