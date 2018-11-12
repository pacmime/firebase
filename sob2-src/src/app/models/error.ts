export class SOBError {

    public type : string = null;
    public message : string = null;

    constructor(type : string, arg : any) {
        this.type = type;
        if( arg && arg instanceof Error )
            this.message = arg.message;
        else if(arg && typeof(arg) === 'string')
            this.message = arg;
        else
            this.message = "An error occurred";
    }

}
