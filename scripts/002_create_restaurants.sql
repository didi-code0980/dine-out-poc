-- Restaurants table
create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  cuisine_type text not null,
  price_tier text not null check (price_tier in ('$', '$$', '$$$', '$$$$')),
  address text not null,
  phone text,
  latitude decimal(10, 8) not null,
  longitude decimal(11, 8) not null,
  star_rating decimal(2, 1) not null default 4.0 check (star_rating >= 4.0),
  review_count integer default 0,
  tagline text,
  hours jsonb,
  is_verified boolean default false,
  is_pioneer boolean default false,
  google_business_profile_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.restaurants enable row level security;

-- RLS Policies for restaurants
create policy "restaurants_select_all"
  on public.restaurants for select
  using (true);

create policy "restaurants_insert_own"
  on public.restaurants for insert
  with check (auth.uid() = owner_id);

create policy "restaurants_update_own"
  on public.restaurants for update
  using (auth.uid() = owner_id);

create policy "restaurants_delete_own"
  on public.restaurants for delete
  using (auth.uid() = owner_id);

-- Index for geospatial queries
create index idx_restaurants_location on public.restaurants (latitude, longitude);
create index idx_restaurants_owner on public.restaurants (owner_id);
