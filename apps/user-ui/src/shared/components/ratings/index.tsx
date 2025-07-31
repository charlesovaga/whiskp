import { Star, StarHalf, StarOff } from "lucide-react";
import { FC } from "react";

type Props = {
  rating: number;
};

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Star key={`star-${i}`} className="text-yellow-400" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<StarHalf key={`half-${i}`} className="text-yellow-400" />);
    } else {
      stars.push(<StarOff key={`empty-${i}`} className="text-gray-300" />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default Ratings;
