interface ResponseStructure {
    statusCode: number
    statusMsg: string
}

class SignUpResponse implements ResponseStructure {
    constructor(
        statusCode: number,
        statusMsg: string,
        data: null
    ) { }

    statusCode: number
    statusMsg: string
}

type ResStruct = {
    data: any
    statusCode: number
    statusMsg: string
}

export {
    ResponseStructure,
    SignUpResponse,
    ResStruct
}