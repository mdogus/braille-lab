
const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');

// GET /auth/register
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Kayıt Ol', error: null });
});

// POST /auth/register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return res.render('auth/register', { title: 'Kayıt Ol', error: error.message });
    }

    // Başarılı kayıt sonrası login sayfasına yönlendir veya direkt login yap (tercihe bağlı)
    // Şimdilik login sayfasına yönlendirelim
    res.render('auth/login', { title: 'Giriş Yap', message: 'Kayıt başarılı! Lütfen giriş yapın.', error: null });
});

// GET /auth/login
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Giriş Yap', error: null, message: null });
});

// POST /auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return res.render('auth/login', { title: 'Giriş Yap', error: error.message, message: null });
    }

    // Token'ları cookie'ye yaz
    res.cookie('access_token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: data.session.expires_in * 1000,
    });

    res.cookie('refresh_token', data.session.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 gün or typical refresh token expiry
    });

    res.redirect('/');
});

// POST /auth/logout (Preferred method for logout)
router.post('/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.redirect('/');
});

// GET /auth/logout (Fallback for simple links)
router.get('/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.redirect('/');
});

module.exports = router;
