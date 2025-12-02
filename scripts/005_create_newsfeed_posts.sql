-- Newsfeed posts for restaurant promotions
create table if not exists public.newsfeed_posts (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references public.restaurants(id) on delete cascade,
  headline text not null,
  description text not null,
  image_url text,
  duration_hours integer not null check (duration_hours in (24, 48, 72)),
  push_radius_miles integer check (push_radius_miles between 15 and 50),
  status text not null default 'active' check (status in ('active', 'scheduled', 'expired')),
  created_at timestamp with time zone default now(),
  expires_at timestamp with time zone not null
);

-- Enable RLS
alter table public.newsfeed_posts enable row level security;

-- RLS Policies
create policy "newsfeed_posts_select_all"
  on public.newsfeed_posts for select
  using (true);

create policy "newsfeed_posts_insert_own"
  on public.newsfeed_posts for insert
  with check (
    auth.uid() in (
      select owner_id from public.restaurants where id = restaurant_id
    )
  );

create policy "newsfeed_posts_update_own"
  on public.newsfeed_posts for update
  using (
    auth.uid() in (
      select owner_id from public.restaurants where id = restaurant_id
    )
  );

create policy "newsfeed_posts_delete_own"
  on public.newsfeed_posts for delete
  using (
    auth.uid() in (
      select owner_id from public.restaurants where id = restaurant_id
    )
  );

create index idx_newsfeed_restaurant on public.newsfeed_posts (restaurant_id);
create index idx_newsfeed_status on public.newsfeed_posts (status);
create index idx_newsfeed_expires on public.newsfeed_posts (expires_at);
