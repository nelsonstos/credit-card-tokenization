export function generateResponse(statusCode: any, data: any, message: any) {
    return {
        statusCode: statusCode,
        data: data,
        message: message
    };
}