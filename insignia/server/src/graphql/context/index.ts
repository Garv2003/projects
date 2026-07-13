export const context = ({ request }: { request: any }) => {
    const authorization = request.headers.get('authorization')
    const token = authorization.split(' ')[1]
    return {
        token
    }
}