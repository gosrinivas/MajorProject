class ExpressError extends Error{
    constructor(StatusCode,message){
        super();
        this.StatusCode=StatusCode;
        this.Message = message;
    }
}

module.exports=ExpressError;