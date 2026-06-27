export interface CardData {
  id: string
  title: string
  sub: string
  img: string
  bgColor: string
  textColor: string
}

export const cardList: CardData[] = [
  {
    id: "card-1",
    title: "Cinematic",
    sub: "",
    img: "/cinematic.png",
    bgColor: "#1a1a1a", // Light Black
    textColor: "#ffffff",
  },
  {
    id: "card-2",
    title: "Reels",
    sub: "",
    img: "/reels.png",
    bgColor: "#999999", // Gray
    textColor: "#ffffff",
  },
  {
    id: "card-3",
    title: "Brand",
    sub: "",
    img: "/brand.png",
    bgColor: "#1a1a1a", // Light Black
    textColor: "#ffffff",
  },
  {
    id: "card-4",
    title: "Motion",
    sub: "",
    img: "/motion.png",
    bgColor: "#999999", // Gray
    textColor: "#ffffff",
  },
  {
    id: "card-5",
    title: "Event",
    sub: "",
    img: "/card-img-1.jpg",
    bgColor: "#1a1a1a", // Light Black
    textColor: "#ffffff",
  },
]
