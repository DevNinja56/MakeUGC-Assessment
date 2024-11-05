import Button from "../../common/button";

interface propTypes {
  text: string;
  onClick: () => void;
  isTrending: boolean;
}

const GoogleTrendsContainer = ({ onClick, text, isTrending }: propTypes) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      padding="py-1 px-3 md:px-5"
      buttonColor={`${isTrending ? "primary" : "transparent"} hover:bg-primary`}
      color={`${isTrending ? "white" : "text-primary"}  hover:text-white`}
      className="border border-primary text-xs md:text-sm capitalize"
      text={text}
    />
  );
};

export default GoogleTrendsContainer;
