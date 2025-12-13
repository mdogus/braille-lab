
const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/test-sr', requireAuth, async (req, res) => {
    try {
        const user = req.user;
        const itemId = 'letters:a:read';
        const now = Date.now();

        // 1. Upsert data to sr_progress
        const upsertData = {
            user_id: user.id,
            item_id: itemId,
            repetitions: 1,
            interval_days: 1,
            easiness: 2.6,
            due_at: now + 86400000, // +1 day
            last_grade: 5,
            updated_at: now
        };

        const { data: insertedData, error: upsertError } = await supabase
            .from('sr_progress')
            .upsert(upsertData)
            .select()
            .single();

        if (upsertError) throw upsertError;

        // 2. Read back data (redundant with select().single() but explicit test)
        const { data: readData, error: readError } = await supabase
            .from('sr_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('item_id', itemId)
            .single();

        if (readError) throw readError;

        res.render('test_db_result', {
            title: 'DB Test Sonucu',
            success: true,
            user: user,
            upserted: insertedData,
            read: readData
        });

    } catch (error) {
        console.error('DB Test Error:', error);
        res.render('test_db_result', {
            title: 'DB Test Hatası',
            success: false,
            error: error.message,
            user: req.user
        });
    }
});

module.exports = router;
