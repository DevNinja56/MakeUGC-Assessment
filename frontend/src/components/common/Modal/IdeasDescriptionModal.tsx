import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { GENERATE_IDEAS_RESPONSE_TYPE } from "../../../types";
import { useEffect } from "react";

interface Props {
  open: boolean;
  handleModal: (val: boolean) => void;
  data: GENERATE_IDEAS_RESPONSE_TYPE;
}

const IdeasDescriptionModal = ({ open, handleModal, data }: Props) => {
  const onCloseModal = () => handleModal(false);

  useEffect(() => {
    if (!Object.keys(data)) handleModal(false);
  }, [data, handleModal]);

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      styles={{ root: { textAlign: "center" } }}
    >
      <h2 className="text-lg font-bold mb-4">Generated Script</h2>
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold">Keywords</p>
          <div className="flex gap-2 items-center flex-wrap">
            {data?.keywords?.map((keyD) => {
              return (
                <span
                  key={keyD}
                  className="rounded-md text-white border border-primary text-xs md:text-sm capitalize py-1 px-3 md:px-5 bg-primary"
                >
                  {keyD}
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <p className="font-semibold">Audience</p>
          <p>{data?.ageGroup?.toUpperCase()}</p>
        </div>
        <div>
          <p className="font-semibold">Tone</p>
          <p>{data?.tone?.toUpperCase()}</p>
        </div>
        <div>
          <p className="font-semibold">Script</p>
          <p>{data?.description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default IdeasDescriptionModal;
