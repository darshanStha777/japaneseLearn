-- JLPT N2 Learning Platform Database Schema

CREATE TABLE IF NOT EXISTS vocabulary (
    id BIGSERIAL PRIMARY KEY,
    kanji VARCHAR(100) NOT NULL,
    furigana VARCHAR(100) NOT NULL,
    english_meaning VARCHAR(500) NOT NULL,
    part_of_speech VARCHAR(50),
    jlpt_level VARCHAR(5) DEFAULT 'N2',
    frequency_rank INTEGER,
    difficulty_level INTEGER DEFAULT 3 CHECK (difficulty_level BETWEEN 1 AND 5),
    example_sentence TEXT,
    sentence_english TEXT,
    word_formation VARCHAR(200),
    related_words TEXT,
    synonyms TEXT,
    antonyms TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_vocabulary_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL DEFAULT 1,
    vocabulary_id BIGINT NOT NULL REFERENCES vocabulary(id),
    first_learned_date DATE,
    last_reviewed_date DATE,
    next_review_date DATE,
    review_count INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    mastery_level INTEGER DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 4),
    interval_days INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, vocabulary_id)
);

CREATE TABLE IF NOT EXISTS daily_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL DEFAULT 1,
    session_date DATE NOT NULL,
    words_studied INTEGER DEFAULT 0,
    words_mastered INTEGER DEFAULT 0,
    quiz_score DECIMAL(5,2) DEFAULT 0,
    session_duration_minutes INTEGER DEFAULT 0,
    target_words INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, session_date)
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL DEFAULT 1,
    quiz_type VARCHAR(50) NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    quiz_score DECIMAL(5,2) NOT NULL,
    category VARCHAR(50),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_stats (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL DEFAULT 1 UNIQUE,
    total_words_learned INTEGER DEFAULT 0,
    total_words_mastered INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    accuracy_rate DECIMAL(5,2) DEFAULT 0,
    estimated_readiness_score DECIMAL(5,2) DEFAULT 0,
    days_until_exam INTEGER DEFAULT 60,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_uvp_user_id ON user_vocabulary_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_uvp_vocab_id ON user_vocabulary_progress(vocabulary_id);
CREATE INDEX IF NOT EXISTS idx_uvp_next_review ON user_vocabulary_progress(next_review_date);
CREATE INDEX IF NOT EXISTS idx_vocab_category ON vocabulary(category);
CREATE INDEX IF NOT EXISTS idx_vocab_jlpt ON vocabulary(jlpt_level);
CREATE INDEX IF NOT EXISTS idx_daily_sessions_user_date ON daily_sessions(user_id, session_date);

-- Insert default learning stats for user 1
INSERT INTO learning_stats (user_id, total_words_learned, total_words_mastered, current_streak, longest_streak, accuracy_rate, estimated_readiness_score, days_until_exam)
VALUES (1, 0, 0, 0, 0, 0, 0, 60)
ON CONFLICT (user_id) DO NOTHING;
