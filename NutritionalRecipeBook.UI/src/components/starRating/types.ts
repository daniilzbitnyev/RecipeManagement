export type StarRaitingProps = {
  raiting: number;
};

export type StarRatingChooseProps = {
  totalStars: number;
  onRate?: (rating: number) => void;
  setHover: React.Dispatch<React.SetStateAction<number>>
  hover: number
  setRating: React.Dispatch<React.SetStateAction<number>>
  rating: number;
};
