const jwt = require('jsonwebtoken');
const key = "Authentication";

exports.authenticateUser = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if (!authToken) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authToken.split(' ')[1];

    try {
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.generateToken = (user) => {
    const payload = {
        username: user.username
    };

    const token = jwt.sign(payload, key, { expiresIn: '1h' });
    return token;
}