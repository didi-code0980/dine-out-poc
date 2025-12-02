export interface Restaurant {
  id: string
  name: string
  cuisine_type: string
  address: string
  phone: string
  star_rating: number
  review_count: number
  price_tier: string
  distance_miles: number
  is_verified: boolean
  tagline?: string
  image_url?: string
}

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Bella Italia Trattoria",
    cuisine_type: "Italian",
    address: "123 Main St, San Francisco, CA 94102",
    phone: "(415) 555-0101",
    star_rating: 4.8,
    review_count: 342,
    price_tier: "$$$",
    distance_miles: 1.2,
    is_verified: true,
    tagline: "Authentic Italian cuisine from Naples",
    image_url: "Bella-Italia-Trattoria.jpeg",
  },
  {
    id: "2",
    name: "Sakura Sushi House",
    cuisine_type: "Japanese",
    address: "456 Oak Ave, San Francisco, CA 94103",
    phone: "(415) 555-0102",
    star_rating: 4.7,
    review_count: 289,
    price_tier: "$$$$",
    distance_miles: 2.1,
    is_verified: true,
    tagline: "Fresh sushi and traditional Japanese dishes",
    image_url: "Sakura-Sushi-House.jpg",

  },
  {
    id: "3",
    name: "The Rustic Table",
    cuisine_type: "American",
    address: "789 Elm St, San Francisco, CA 94104",
    phone: "(415) 555-0103",
    star_rating: 4.6,
    review_count: 421,
    price_tier: "$$",
    distance_miles: 0.8,
    is_verified: true,
    tagline: "Farm-to-table comfort food",
    image_url: "wedding-rustic-table-style.webp",
  },
  {
    id: "4",
    name: "Spice Garden",
    cuisine_type: "Indian",
    address: "321 Pine St, San Francisco, CA 94105",
    phone: "(415) 555-0104",
    star_rating: 4.5,
    review_count: 178,
    price_tier: "$$",
    distance_miles: 1.5,
    is_verified: false,
    tagline: "Bold flavors from North India",
    image_url: "Spice-Garden.jpg",
  },
  {
    id: "5",
    name: "Le Petit Bistro",
    cuisine_type: "French",
    address: "654 Market St, San Francisco, CA 94106",
    phone: "(415) 555-0105",
    star_rating: 4.9,
    review_count: 512,
    price_tier: "$$$$",
    distance_miles: 2.3,
    is_verified: true,
    tagline: "Classic French cuisine with modern flair",
    image_url: "paris.jpg",
  },
]
