class SignUpRequest {
    constructor(
        userEmail: string,
        userPassword: string,
        userName: string,
        userDepartment: string
    ) { 
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.userName = userName
        this.userDepartment = userDepartment
    }

    userEmail: string
    userPassword: string
    userName: string
    userDepartment: string
}

export {
    SignUpRequest
}