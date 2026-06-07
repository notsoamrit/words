create table searched_words (
  id bigint generated always as identity primary key,
  word text not null,
  explanation text,
  searched_at timestamptz default now()
);