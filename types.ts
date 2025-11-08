
export interface MenuItem {
  id: string;
  name: string;
  price: string;
}

export interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface RestaurantLink {
  id: string;
  title: string;
  url: string;
}

export interface RestaurantImage {
  id: string;
  src: string;
  alt: string;
}

export interface Restaurant {
  id: string;
  name: string;
  menus: Menu[];
  links: RestaurantLink[];
  images: RestaurantImage[];
}
