export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface MenuItemType {
  id: number;
  title: string;
  route?: string;
  url?: string;
  children?: MenuItemType[];
}
