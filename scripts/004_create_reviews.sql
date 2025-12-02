-- Reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  mood text check (mood in ('loved', 'liked', 'neutral', 'disliked', 'hated')),
  comment text,
  created_at timestamp with time zone default now(),
  unique(user_id, restaurant_id)
);

-- Enable RLS
alter table public.reviews enable row level security;

-- RLS Policies
create policy "reviews_select_all"
  on public.reviews for select
  using (true);

create policy "reviews_insert_own"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "reviews_update_own"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "reviews_delete_own"
  on public.reviews for delete
  using (auth.uid() = user_id);

create index idx_reviews_restaurant on public.reviews (restaurant_id);
create index idx_reviews_user on public.reviews (user_id);
