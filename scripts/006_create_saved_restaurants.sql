-- Saved restaurants for users
create table if not exists public.saved_restaurants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, restaurant_id)
);

-- Enable RLS
alter table public.saved_restaurants enable row level security;

-- RLS Policies
create policy "saved_restaurants_select_own"
  on public.saved_restaurants for select
  using (auth.uid() = user_id);

create policy "saved_restaurants_insert_own"
  on public.saved_restaurants for insert
  with check (auth.uid() = user_id);

create policy "saved_restaurants_delete_own"
  on public.saved_restaurants for delete
  using (auth.uid() = user_id);

create index idx_saved_restaurants_user on public.saved_restaurants (user_id);
