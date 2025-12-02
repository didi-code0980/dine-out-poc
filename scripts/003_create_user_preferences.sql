-- User preferences for matching
create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  occasion text,
  party_size integer,
  cuisine_type text,
  price_range text,
  distance_miles integer,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.user_preferences enable row level security;

-- RLS Policies
create policy "user_preferences_select_own"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "user_preferences_insert_own"
  on public.user_preferences for insert
  with check (auth.uid() = user_id);

create policy "user_preferences_update_own"
  on public.user_preferences for update
  using (auth.uid() = user_id);

create index idx_user_preferences_user on public.user_preferences (user_id);
