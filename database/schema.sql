-- JLPT N2 Vocabulary Learning Platform - Database Schema
-- PostgreSQL 14+

-- Drop existing tables (for fresh setup)
DROP TABLE IF EXISTS learning_stats CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS daily_sessions CASCADE;
DROP TABLE IF EXISTS user_vocabulary_progress CASCADE;
DROP TABLE IF EXISTS vocabulary CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    exam_date DATE DEFAULT '2025-07-06',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main vocabulary table
CREATE TABLE vocabulary (
    id SERIAL PRIMARY KEY,
    kanji VARCHAR(255) NOT NULL,
    furigana VARCHAR(255) NOT NULL,
    english_meaning TEXT NOT NULL,
    part_of_speech VARCHAR(50),
    jlpt_level VARCHAR(10) DEFAULT 'N2',
    frequency_rank INT,
    difficulty_level INT CHECK (difficulty_level >= 1 AND difficulty_level <= 5),
    example_sentence TEXT,
    sentence_english TEXT,
    word_formation VARCHAR(500),
    category VARCHAR(50),
    related_words TEXT,
    synonyms TEXT,
    antonyms TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User vocabulary progress (SRS tracking)
CREATE TABLE user_vocabulary_progress (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    vocabulary_id INT NOT NULL,
    first_learned_date DATE,
    last_reviewed_date DATE,
    next_review_date DATE,
    review_count INT DEFAULT 0,
    correct_count INT DEFAULT 0,
    incorrect_count INT DEFAULT 0,
    mastery_level INT DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 4),
    srs_interval INT DEFAULT 1,
    ease_factor DECIMAL(3,2) DEFAULT 2.5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id) ON DELETE CASCADE,
    UNIQUE (user_id, vocabulary_id)
);

-- Daily learning sessions
CREATE TABLE daily_sessions (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    session_date DATE NOT NULL,
    words_studied INT DEFAULT 0,
    words_mastered INT DEFAULT 0,
    quiz_score DECIMAL(5,2),
    session_duration_minutes INT,
    target_words INT DEFAULT 60,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (user_id, session_date)
);

-- Quiz attempt history
CREATE TABLE quiz_attempts (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1,
    quiz_type VARCHAR(50),
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    quiz_score DECIMAL(5,2) NOT NULL,
    category VARCHAR(100),
    duration_seconds INT,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Learning statistics
CREATE TABLE learning_stats (
    id SERIAL PRIMARY KEY,
    user_id INT DEFAULT 1 UNIQUE,
    total_words_learned INT DEFAULT 0,
    total_words_mastered INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    accuracy_rate DECIMAL(5,2) DEFAULT 0,
    estimated_readiness_score DECIMAL(5,2) DEFAULT 0,
    days_until_exam INT,
    learning_velocity DECIMAL(5,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_vocab_category ON vocabulary(category);
CREATE INDEX idx_vocab_frequency ON vocabulary(frequency_rank);
CREATE INDEX idx_vocab_jlpt ON vocabulary(jlpt_level);
CREATE INDEX idx_progress_user ON user_vocabulary_progress(user_id);
CREATE INDEX idx_progress_next_review ON user_vocabulary_progress(next_review_date);
CREATE INDEX idx_session_date ON daily_sessions(user_id, session_date);
CREATE INDEX idx_quiz_user ON quiz_attempts(user_id);

-- Insert default user
INSERT INTO users (id, username, email, exam_date)
VALUES (1, 'default_user', 'user@japaneselearn.com', '2025-07-06')
ON CONFLICT DO NOTHING;

-- Insert default learning stats
INSERT INTO learning_stats (user_id) VALUES (1) ON CONFLICT DO NOTHING;
