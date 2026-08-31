import { ImageSourcePropType } from "react-native";

interface Review {
  id: string;
  icon: ImageSourcePropType;
  name: string;
  review: string;
  rating: number;
}
export type { Review };