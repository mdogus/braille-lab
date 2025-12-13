
const supabase = require('../utils/supabase');

const requireAuth = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.redirect('/auth/login');
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        // Token valid değilse veya süresi dolmuşsa çerezleri temizle
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.redirect('/auth/login');
    }

    req.user = user;
    next();
};

const optionalAuth = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        req.user = null;
        return next();
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        req.user = null;
    } else {
        req.user = user;
    }
    next();
};

module.exports = { requireAuth, optionalAuth };
