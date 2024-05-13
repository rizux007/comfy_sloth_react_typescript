import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";

interface Link {
  id: number;
  text: string;
  url: string;
}

export const links: Link[] = [
  { id: 1, text: "home", url: "/" },
  { id: 2, text: "about", url: "/about" },
  { id: 3, text: "products", url: "/products" },
];

export interface Service {
  id: number;
  icon: JSX.Element;
  title: string;
  text: string;
}

export const services: Service[] = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];
// export const products_url = 'https://course-api.com/react-store-products'
// export const products_url = 'https://dummyjson.com/products'

// // export const single_product_url = `https://course-api.com/react-store-single-product?id=`
// export const single_product_url = `https://dummyjson.com/products/`
export const url: string =
  "https://strapi-store-server.onrender.com/api/products";