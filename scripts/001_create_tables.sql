-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  email TEXT NOT NULL,
  user_type TEXT NOT NULL DEFAULT 'regular' CHECK (user_type IN ('regular', 'premium', 'restaurant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant businesses table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cuisine_type TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  google_place_id TEXT UNIQUE,
  google_rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  price_tier INTEGER CHECK (price_tier BETWEEN 1 AND 4),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  hours JSONB,
  tagline TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_pioneer BOOLEAN DEFAULT FALSE,
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Restaurant posts/promotions table
CREATE TABLE IF NOT EXISTS public.restaurant_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  image_url TEXT,
  headline TEXT NOT NULL CHECK (LENGTH(headline) <= 60),
  description TEXT NOT NULL CHECK (LENGTH(description) <= 280),
  duration_hours INTEGER NOT NULL CHECK (duration_hours IN (24, 48, 72)),
  push_enabled BOOLEAN DEFAULT FALSE,
  push_radius_miles INTEGER CHECK (push_radius_miles BETWEEN 15 AND 50),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'scheduled')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User search history
CREATE TABLE IF NOT EXISTS public.search_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  occasion TEXT,
  party_size INTEGER,
  cuisine_type TEXT,
  price_range TEXT,
  distance_miles INTEGER,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User saved restaurants (favorites)
CREATE TABLE IF NOT EXISTS public.saved_restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, restaurant_id)
);

-- User reviews and ratings
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  mood_emoji TEXT,
  comment TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, restaurant_id)
);

-- Date with Destiny usage tracking
CREATE TABLE IF NOT EXISTS public.destiny_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  mode TEXT CHECK (mode IN ('mystery_reveal', 'spin_bottle', 'fingerprint', 'dice', 'phone_dialer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destiny_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for restaurants (public read, owner write)
CREATE POLICY "Anyone can view active restaurants" ON public.restaurants
  FOR SELECT USING (is_verified = TRUE);

CREATE POLICY "Restaurant owners can update their restaurant" ON public.restaurants
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Restaurant owners can insert their restaurant" ON public.restaurants
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- RLS Policies for restaurant_posts
CREATE POLICY "Anyone can view active posts" ON public.restaurant_posts
  FOR SELECT USING (status = 'active');

CREATE POLICY "Restaurant owners can manage their posts" ON public.restaurant_posts
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM public.restaurants WHERE owner_id = auth.uid()
    )
  );

-- RLS Policies for search_history
CREATE POLICY "Users can view their own search history" ON public.search_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search history" ON public.search_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for saved_restaurants
CREATE POLICY "Users can view their saved restaurants" ON public.saved_restaurants
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their saved restaurants" ON public.saved_restaurants
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Users can view public reviews" ON public.reviews
  FOR SELECT USING (is_public = TRUE OR auth.uid() = user_id);

CREATE POLICY "Users can manage their own reviews" ON public.reviews
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for destiny_usage
CREATE POLICY "Users can view their own destiny usage" ON public.destiny_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own destiny usage" ON public.destiny_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);
