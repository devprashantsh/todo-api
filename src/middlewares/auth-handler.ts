const authorize = async ({ jwt, set, cookie: { auth }}: any) => {
    const profile = await jwt.verify(auth)
    if (!profile) {
        set.status = 401
        return {message: 'Unauthorised', success: false}
    }
    

}

export default authorize;