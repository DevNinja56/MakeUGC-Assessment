import { GENERATE_IDEAS_RESPONSE_TYPE } from "../../../types";

interface propTyeps {
  idea: GENERATE_IDEAS_RESPONSE_TYPE;
  handleModal: (val: boolean) => void;
  handleSelectedVal: (val: GENERATE_IDEAS_RESPONSE_TYPE) => void;
}

const SingleIdea = ({ idea, handleModal, handleSelectedVal }: propTyeps) => {
  return (
    <div className="w-full bg-white border-2 border-primary rounded-md py-7 px-5 text-primary relative text-sm font-medium">
      <p
        className="hover:cursor-pointer"
        onClick={() => {
          handleSelectedVal(idea);
          handleModal(true);
        }}
      >
        {idea?.description?.slice(0, 100) +
          (idea?.description?.length > 100 ? "..." : "") ||
          "No description available"}
      </p>
    </div>
  );
};

export default SingleIdea;
