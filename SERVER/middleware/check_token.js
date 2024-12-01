const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.cookies?.jwtToken

        if (!jwtToken) return res.json({ error: 'Access denied. No access_token provided.' })
        if (!jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)) return res.status(401).json({ error: 'Invalid token' })

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        const accessToken = payload.accessToken

        const res = await fetch(process.env.ACCOUNT_USER_API_URL, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        if (!res.ok) return res.json({ error: 'Access denied' })

        const user = await res.json()

        // console.log(user)
        req.user = user
        next()
    } catch (e) {
        return res.json({ error: 'Access denied' })
    }
}