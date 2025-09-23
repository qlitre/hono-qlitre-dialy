-- アクセス数テーブル
CREATE TABLE IF NOT EXISTS daily_page_views (
  page_id TEXT NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD形式
  views INTEGER DEFAULT 1,
  PRIMARY KEY (page_id, date)
);

-- 人気記事一覧用のテーブル
CREATE TABLE IF NOT EXISTS popular_page (
  page_id TEXT PRIMARY KEY,
  views INTEGER DEFAULT 1,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  category_id TEXT,
  category_name TEXT,
  tags TEXT, -- JSON配列として保存 (例: ["tag1", "tag2"])
  published_at TEXT,
  updated_at TEXT,
  is_active BOOLEAN DEFAULT true
);