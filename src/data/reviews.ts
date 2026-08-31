import { icons } from "@/src/constant";
import { Review } from "../types";

export const reviews: Review[] = [
  {
    id: "1",
    icon: icons.avatar,
    name: "John Doe",
    review: "This is a sample review.",
    rating: 4.5,
  },
  {
    id: "2",
    icon: icons.avatar,
    name: "Jane Smith",
    review: "This is another sample review.",
    rating: 4.0,
  },
  {
    id: "3",
    icon: icons.avatar,
    name: "Alice Johnson",
    review: "Yet another sample review.",
    rating: 5.0,
  },
  {
    id: "4",
    icon: icons.avatar,
    name: "Bob Brown",
    review: "This is a sample review.",
    rating: 3.5,
  },
  {
    id: "5",
    icon: icons.avatar,
    name: "Charlie Davis",
    review: "Another sample review.",
    rating: 4.2,
  }
];