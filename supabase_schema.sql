-- Supabase SQL Database Migration Schema for Abdullah's Portfolio & Admin Dashboard

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  location TEXT NOT NULL,
  email TEXT NOT NULL,
  github TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  twitter TEXT NOT NULL,
  availability TEXT NOT NULL,
  profile_image TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Hero Section Table
CREATE TABLE IF NOT EXISTS hero (
  id INT PRIMARY KEY DEFAULT 1,
  headline1 TEXT NOT NULL,
  headline2 TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  years_exp TEXT NOT NULL,
  suites_count TEXT NOT NULL,
  defect_rate TEXT NOT NULL,
  products_count TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  metrics TEXT,
  tags TEXT[],
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  tags TEXT[],
  content JSONB NOT NULL,
  thumbnail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  percentage INT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- 6. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  badge TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS) & Allow Read/Write Public Access for Portfolio API
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on profile" ON profile FOR ALL USING (true);

CREATE POLICY "Allow public read access on hero" ON hero FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on hero" ON hero FOR ALL USING (true);

CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public all access on projects" ON projects FOR ALL USING (true);

CREATE POLICY "Allow public read access on blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow public all access on blogs" ON blogs FOR ALL USING (true);

CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public all access on skills" ON skills FOR ALL USING (true);

CREATE POLICY "Allow public read access on certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Allow public all access on certifications" ON certifications FOR ALL USING (true);

CREATE POLICY "Allow public read access on contact_messages" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Allow public all access on contact_messages" ON contact_messages FOR ALL USING (true);

-- Insert Initial Seed Rows for Profile and Hero
INSERT INTO profile (id, name, title, bio, location, email, github, linkedin, twitter, availability)
VALUES (
  1,
  'Abdullah Al Omar',
  'Software Quality Assurance Engineer & Test Automation Specialist',
  'I specialize in building bulletproof test automation frameworks, CI/CD quality gates, API regression suites, and high-concurrency performance benchmarks.',
  'Dhaka, Bangladesh • Available Remote',
  'abdullah.sqa@gmail.com',
  'https://github.com',
  'https://linkedin.com',
  'https://twitter.com',
  'Open for Freelance & Contract'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO hero (id, headline1, headline2, subtitle, years_exp, suites_count, defect_rate, products_count)
VALUES (
  1,
  'Say Hi from Abdullah,',
  'SQA Engineer.',
  'I specialize in building bulletproof test automation frameworks, CI/CD quality gates, API regression suites, and high-concurrency performance benchmarks so products deploy faster with zero critical defects.',
  '6',
  '120',
  '99.9',
  '50'
)
ON CONFLICT (id) DO NOTHING;

