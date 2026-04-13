# JLPT N2 Learning Platform 🇯🇵

A complete full-stack vocabulary learning platform for JLPT N2 exam preparation, featuring Spaced Repetition System (SRS), quizzes, and progress tracking.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + Recharts
- **Backend**: Spring Boot 3 + PostgreSQL + JPA
- **Libraries**: Axios, React Router v6, date-fns

## Features

- 📖 **Flashcard Study** with SRS (5 mastery levels: New → Learning → Reviewing → Mature → Perfect)
- ✍️ **Interactive Quizzes** — multiple choice, kanji→meaning, meaning→kanji
- 📊 **Progress Dashboard** — weekly charts, category mastery, streak tracking
- 🎯 **N2 Exam Readiness Score** — circular progress indicator
- 📅 **2-Month Study Plan** — structured daily targets (50–80 words/day)
- ⚠️ **Weak Areas Report** — category-based mastery analysis
- 🔥 **Study Streak** — 7-day heatmap with streak counter
- 🌙 **Dark Mode** — full Tailwind dark mode support
- 🔄 **Works offline** — fallback sample data when backend is unavailable

## Vocabulary Coverage

650+ authentic JLPT N2 words across 6 categories:
1. **Business** (会社用語) — corporate vocabulary
2. **Academic** (学術用語) — research and academic terms
3. **Keigo** (敬語) — formal/polite expressions
4. **Daily Life** (日常会話) — everyday conversation
5. **Idioms** (ことわざ・慣用句) — proverbs and idiomatic expressions
6. **Kanji Compounds** (漢字語) — compound kanji vocabulary

## Quick Start

### Frontend (works without backend)
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### Backend Setup
1. Install PostgreSQL and create database:
```sql
CREATE DATABASE japaneselearn;
```
2. Run schema:
```bash
psql -U postgres -d japaneselearn -f database/schema.sql
psql -U postgres -d japaneselearn -f backend/src/main/resources/data/vocabulary_n2.sql
```
3. Start backend:
```bash
cd backend
./mvnw spring-boot:run
```

## Project Structure

```
japaneseLearn/
├── frontend/          # React 18 + Vite frontend
│   └── src/
│       ├── components/  # Flashcard, QuizCard, Dashboard, etc.
│       ├── pages/       # Home, Learn, Quiz, Progress, Settings
│       ├── hooks/       # useVocabulary, useProgress, useSRS
│       └── services/    # API client, SRS calculator
├── backend/           # Spring Boot 3 backend
│   └── src/main/java/com/japaneselearn/
│       ├── model/       # JPA entities
│       ├── repository/  # Spring Data repositories
│       ├── service/     # Business logic + SRS
│       └── controller/  # REST API controllers
└── database/          # PostgreSQL schema
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vocab/today` | Today's study words |
| GET | `/api/vocab/category/{cat}` | Words by category |
| GET | `/api/vocab/search?q=` | Search vocabulary |
| POST | `/api/study/mark-learned` | Mark word learned |
| GET | `/api/study/due-review` | Cards due for review |
| GET | `/api/quiz/generate` | Generate quiz |
| POST | `/api/quiz/submit-answer` | Submit quiz answer |
| GET | `/api/progress/daily` | Daily progress stats |
| GET | `/api/progress/readiness` | N2 readiness score |

## SRS Algorithm

Intervals by mastery level: **1 → 3 → 7 → 14 → 30 days**
- Correct answer: advance mastery level
- Wrong answer: reset to level 0 (1-day interval)
