class ResponseStructure {
    constructor(
        statusCode: number,
        statusMsg: string
    ) {
        this.statusCode = statusCode
        this.statusMsg = statusMsg
    }

    statusCode: number
    statusMsg: string
}

type ResStruct = {
    data: any
    statusCode: number
    statusMsg: string
}

class SignInResponse extends ResponseStructure {
    constructor(
        data: token,
        statusCode: number,
        statusMsg: string
    ) {
        super(statusCode, statusMsg)
        this.data = data
    }

    data: token
    statusCode: number
    statusMsg: string
}

type token = {
    accesstoken: string,
    refreshtoken: string
}

export {
    ResponseStructure,
    ResStruct,
    SignInResponse,
    token
}