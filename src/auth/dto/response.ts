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

class EmailResponse extends ResponseStructure {
    constructor(
        data: string,
        statusCode: number,
        statusMsg: string
    ) {
        super(statusCode, statusMsg)
        this.data = data
    }

    data: string
}

class FindPasswordResponse extends ResponseStructure {
    constructor(
        data: string,
        statusCode: number,
        statusMsg: string
    ) {
        super(statusCode, statusMsg)
        this.data = data
    }

    data: string
}

type ValidateTokenResponse = {
    userId: number
}

class ModifyPasswordResponse extends ResponseStructure {
    constructor(
        data: string,
        statusCode: number,
        statusMsg: string
    ) {
        super(statusCode, statusMsg)
        this.data = data
    }

    data: string
}

export {
    ResponseStructure,
    ResStruct,
    SignInResponse,
    token,
    EmailResponse,
    FindPasswordResponse,
    ValidateTokenResponse,
    ModifyPasswordResponse
}