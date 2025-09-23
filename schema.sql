-- アクセス数テーブル
CREATE TABLE IF NOT EXISTS daily_page_views (
  page_id TEXT NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD形式
  views INTEGER DEFAULT 1,
  PRIMARY KEY (page_id, date)
);