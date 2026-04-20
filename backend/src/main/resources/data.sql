-- Initial user setup (default user for single-user mode)
INSERT INTO users (username, email, exam_date) 
VALUES ('default_user', 'user@example.com', '2026-07-07')
ON CONFLICT (username) DO NOTHING;
