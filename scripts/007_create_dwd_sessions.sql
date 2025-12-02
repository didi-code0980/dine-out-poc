-- Date With Destiny sessions tracking
create table if not exists public.dwd_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  restaurant_options jsonb not null,
  selected_restaurant_id uuid references public.restaurants(id),
  reveal_mode text not null check (reveal_mode in ('spin', 'fingerprint', 'dice', 'elimination', 'mystery', 'random_dialer')),
  status text not null default 'pending' check (status in ('pending', 'revealed', 'completed')),
  created_at timestamp with time zone default now(),
  revealed_at timestamp with time zone
);

-- Enable RLS
alter table public.dwd_sessions enable row level security;

-- RLS Policies
create policy "dwd_sessions_select_own"
  on public.dwd_sessions for select
  using (auth.uid() = user_id);

create policy "dwd_sessions_insert_own"
  on public.dwd_sessions for insert
  with check (auth.uid() = user_id);

create policy "dwd_sessions_update_own"
  on public.dwd_sessions for update
  using (auth.uid() = user_id);

create index idx_dwd_sessions_user on public.dwd_sessions (user_id);
