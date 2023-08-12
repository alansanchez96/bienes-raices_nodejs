import jwt from "jsonwebtoken";
import { User } from "../../Models/Associations.js";

const jwtMiddleware = async (req, res, next) => {
    const { access_token } = req.cookies;

    if (!access_token) return res.redirect(303, '/login');

    try {
        const jwtDecoded = jwt.verify(access_token, process.env.JWT_SECRET);

        const user = await User.scope('deletePassword').findByPk(jwtDecoded.data.user_id);

        if (!user) return res.redirect(303, '/login');

        req.user = user;

        return next();

    } catch (error) {
        return res.clearCookie('access_token').redirect(303, '/login');
    }
}

export {
    jwtMiddleware
}