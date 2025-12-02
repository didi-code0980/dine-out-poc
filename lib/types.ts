export type UserType = "regular" | "premium" | "restaurant"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  user_type: UserType
  created_at: string
  updated_at: string
}

export interface Restaurant {
  id: string
  owner_id: string
  name: string
  cuisine_type: string
  price_tier: "$" | "$$" | "$$$" | "$$$$"
  address: string
  phone: string | null
  latitude: number
  longitude: number
  star_rating: number
  review_count: number
  tagline: string | null
  hours: Record<string, unknown> | null
  is_verified: boolean
  is_pioneer: boolean
  google_business_profile_id: string | null
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id: string
  restaurant_id: string
  rating: number
  mood: "loved" | "liked" | "neutral" | "disliked" | "hated"
  comment: string | null
  created_at: string
}

export interface NewsfeedPost {
  id: string
  restaurant_id: string
  headline: string
  description: string
  image_url: string | null
  duration_hours: 24 | 48 | 72
  push_radius_miles: number | null
  status: "active" | "scheduled" | "expired"
  created_at: string
  expires_at: string
}

export interface DWDSession {
  id: string
  user_id: string
  restaurant_options: Restaurant[]
  selected_restaurant_id: string | null
  reveal_mode: "spin" | "fingerprint" | "dice" | "elimination" | "mystery" | "random_dialer"
  status: "pending" | "revealed" | "completed"
  created_at: string
  revealed_at: string | null
}
