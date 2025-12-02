-- Seed sample restaurants for testing
insert into public.restaurants (
  name, 
  cuisine_type, 
  price_tier, 
  address, 
  phone, 
  latitude, 
  longitude, 
  star_rating, 
  review_count, 
  tagline,
  is_verified
) values
(
  'The Golden Fork',
  'Italian',
  '$$$',
  '123 Main St, San Francisco, CA 94102',
  '+1-415-555-0101',
  37.7749,
  -122.4194,
  4.8,
  342,
  'Authentic Italian cuisine in the heart of the city',
  true
),
(
  'Sakura Sushi House',
  'Japanese',
  '$$',
  '456 Market St, San Francisco, CA 94103',
  '+1-415-555-0102',
  37.7849,
  -122.4094,
  4.6,
  287,
  'Fresh sushi and traditional Japanese dishes',
  true
),
(
  'Taqueria Del Sol',
  'Mexican',
  '$',
  '789 Mission St, San Francisco, CA 94104',
  '+1-415-555-0103',
  37.7649,
  -122.4294,
  4.7,
  512,
  'Family-owned authentic Mexican food',
  true
),
(
  'The Spice Route',
  'Indian',
  '$$',
  '321 Valencia St, San Francisco, CA 94110',
  '+1-415-555-0104',
  37.7549,
  -122.4394,
  4.5,
  198,
  'Traditional Indian flavors with modern twist',
  true
),
(
  'Le Petit Bistro',
  'French',
  '$$$$',
  '654 Geary St, San Francisco, CA 94109',
  '+1-415-555-0105',
  37.7849,
  -122.4494,
  4.9,
  423,
  'Elegant French dining experience',
  true
);
