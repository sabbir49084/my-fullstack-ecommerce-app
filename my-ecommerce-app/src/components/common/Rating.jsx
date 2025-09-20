import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

// ✅ components/common/Rating.jsx

const Rating = ({ value }) => {
  return (
    <div className="flex text-yellow-500">
      {[1, 2, 3, 4, 5].map((star) => {
        if (value >= star) {
          return <FaStar key={star} />;
        } else if (value >= star - 0.5) {
          return <FaStarHalfAlt key={star} />;
        } else {
          return <FaRegStar key={star} />;
        }
      })}
    </div>
  );
};

export default Rating;
