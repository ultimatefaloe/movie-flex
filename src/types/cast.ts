import { ImageSourcePropType } from "react-native";

interface CastMember {
  name: string;
  image: ImageSourcePropType;
  role?: string;
}

export  type { CastMember };