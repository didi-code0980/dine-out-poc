-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_restaurants_location ON public.restaurants(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine ON public.restaurants(cuisine_type);
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON public.restaurants(google_rating DESC);
CREATE INDEX IF NOT EXISTS idx_restaurants_verified ON public.restaurants(is_verified) WHERE is_verified = TRUE;
CREATE INDEX IF NOT EXISTS idx_posts_restaurant ON public.restaurant_posts(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.restaurant_posts(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_posts_expires ON public.restaurant_posts(expires_at);
CREATE INDEX IF NOT EXISTS idx_reviews_restaurant ON public.reviews(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_saved_user ON public.saved_restaurants(user_id);
