-- Initial user setup (default user for single-user mode)
INSERT INTO users (username, email, exam_date) 
VALUES ('default_user', 'user@example.com', '2025-07-06')
ON CONFLICT (username) DO NOTHING;
