CREATE TABLE IF NOT EXISTS chat_rooms (
  id UUID PRIMARY KEY,
  visitor_lang VARCHAR(2) NOT NULL CHECK (visitor_lang IN ('EN','DE','TR','RU','ZH')),
  visitor_token_hash CHAR(64) NOT NULL,
  ip_hash CHAR(64) NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_rooms_updated_idx ON chat_rooms (updated_at DESC);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender VARCHAR(16) NOT NULL CHECK (sender IN ('visitor','operator')),
  original_lang VARCHAR(2) NOT NULL CHECK (original_lang IN ('EN','DE','TR','RU','ZH')),
  original_text TEXT NOT NULL,
  operator_text TEXT,
  visitor_text TEXT,
  translation_status VARCHAR(24) NOT NULL DEFAULT 'not_needed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_messages_room_created_idx
  ON chat_messages (room_id, created_at ASC);

CREATE TABLE IF NOT EXISTS operator_sessions (
  id UUID PRIMARY KEY,
  token_hash CHAR(64) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS operator_sessions_expiry_idx ON operator_sessions (expires_at);

CREATE TABLE IF NOT EXISTS operator_presence (
  singleton BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (singleton),
  last_seen TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT NOT NULL,
  window_start BIGINT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (key, window_start)
);

CREATE INDEX IF NOT EXISTS rate_limits_updated_idx ON rate_limits (updated_at);
