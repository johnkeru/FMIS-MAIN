const assignedRole = require('../models/assigned_role')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const { username, password, rememberMe } = req.body;
    try {
        const tokenApi = process.env.ACCOUNT_TOKEN_API_URL;
        const clientId = process.env.CLIENT_ID;
        const ownerId = process.env.OWNER_ID;
        const encodedCredentials = Buffer.from(`${clientId}:${ownerId}`).toString('base64');

        // Make the API request to get the credentials
        const credentials = await (await fetch(tokenApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedCredentials}`
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username,
                password
            })
        })).json();

        // Calculate the expiration times based on rememberMe
        const expiresIn = credentials.expires_in;
        const cookieExpiration = expiresIn * 1000 * (rememberMe ? 2 : 1); // In milliseconds
        const tokenExpiration = expiresIn * (rememberMe ? 2 : 1);         // In seconds

        // Set the access_token as a cookie
        const accessToken = credentials.access_token;
        // jwt time unit is seconds
        const jwtToken = jwt.sign({ accessToken }, process.env.JWT_SECRET_KEY, { expiresIn: tokenExpiration })
        // cookie time unit is milliseconds

        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('jwtToken', jwtToken, {
            domain: isProduction ? '.nia.gov.ph' : 'localhost',
            secure: true,          // ensure secure if using https
            sameSite: 'None',       // if required for cross-site access
            httpOnly: true,
            maxAge: cookieExpiration
        });

        // Return ok
        res.sendStatus(200)

    } catch (e) {
        console.error(e)
        res.status(200).json({ error: e.message + process.env.CLIENT2 });
    }
};

exports.getUser = async (req, res) => {
    try {
        let roles = []
        const user = req.user
        let responseBody = null
        const assignedRoles = await assignedRole.findOne({ user: user.Username[0] }).populate({ path: 'roles', select: 'name' })
        assignedRoles?.roles.forEach(role => roles.push(role.name))
        if (assignedRoles) responseBody = { ...user, Roles: roles } // override the Roles by FMIS own roles
        else responseBody = { ...user, Roles: [] } // override the Roles by FMIS own roles
        res.json({ user: responseBody })
    } catch (e) {
        console.error(e)
        res.json({ error: 'Server error' })
    }
}

exports.logout = (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';

    res.clearCookie('jwtToken', {
        domain: isProduction ? '.nia.gov.ph' : 'localhost',
        httpOnly: true,             // For security (if necessary)
        secure: true,               // Use this if your site uses HTTPS
    });  // Clear the cookie);

    res.status(200).json({ message: 'Logged out successfully' });
};