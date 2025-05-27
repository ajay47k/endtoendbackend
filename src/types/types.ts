// To define and organize custom types, interfaces, and type aliases used across your application.
export type THttpResponse = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null // in production it might be removed
        method: string
        url: string
    }
    message: string
    data: unknown
}
export type THttpError = {
    success: boolean
    statusCode: number
    request: {
        ip?: string | null // in production it might be removed
        method: string
        url: string
    }
    message: string
    data: unknown
    trace?: object | null // this is the trace object which tells at which line number the error came.
}
