create table words (
  id bigint generated always as identity primary key,
  word text unique not null,
  explanation text not null,
  is_favorite boolean default false,
  created_at timestamptz default now()
);

create index words_word_idx on words(word);
