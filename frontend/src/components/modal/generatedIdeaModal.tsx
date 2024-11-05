import React, { SetStateAction, useState } from "react";
import { GENERATE_IDEAS_RESPONSE_TYPE, GENERATE_IDEAS_TYPE } from "../../types";
import { CiBookmark } from "react-icons/ci";
import { fetchRequest } from "../../utils/axios/fetch";
import { API_ENDPOINTS } from "../../constant/api-endpoints";
import toast from "react-hot-toast";
import LoaderSpinner from "../common/loaderSpinner";
import { useUserAuth } from "../../hooks/auth-hook";
import { RxCross2 } from "react-icons/rx";
import { IoIosBookmark } from "react-icons/io";

interface propTypes {
  generatedIdeas: GENERATE_IDEAS_RESPONSE_TYPE;
  setGeneratedIdeas: React.Dispatch<
    SetStateAction<GENERATE_IDEAS_RESPONSE_TYPE | undefined>
  >;
  setFormData: React.Dispatch<SetStateAction<GENERATE_IDEAS_TYPE>>;
}

const GeneratedIdeaModal = ({
  generatedIdeas,
  setGeneratedIdeas,
  setFormData,
}: propTypes) => {
  const { isAuthenticated } = useUserAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookmarkId, setBookMarkId] = useState<string>();

  const onAddBookmark = () => {
    if (!isAuthenticated) {
      toast.error("Please Login First");
      return;
    }
    setLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.BOOKMARK,
      type: "post",
      body: { generateId: generatedIdeas?._id },
    })
      .then((res) => {
        setIsFavorite(true);
        setBookMarkId(res?.data?._id);
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      })
      .finally(() => setLoading(false));
  };

  const onDeleteBookmark = () => {
    if (!isAuthenticated) {
      toast.error("Please Login First");
      return;
    }
    setLoading(true);
    fetchRequest({
      url: `${API_ENDPOINTS.BOOKMARK}/${bookmarkId}`,
      type: "delete",
    })
      .then((res) => {
        setIsFavorite(false);
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      onClick={() => {
        setGeneratedIdeas(undefined);
      }}
      className="h-screen w-screen bg-black/40 flex items-center justify-center fixed top-0 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-6/12 rounded-md relative bg-white mx-auto flex items-center justify-center px-5 py-10 flex-col gap-5"
      >
        <h1 className="text-2xl font-bold">Generated Content</h1>
        <p className="text-lg font-medium text-center">
          {generatedIdeas.description}
        </p>
        <div className="absolute top-2 right-2 flex items-center gap-2">
          {loading ? (
            <LoaderSpinner color="text-primary" />
          ) : isFavorite ? (
            <IoIosBookmark
              onClick={() => {
                setIsFavorite(false);
                onDeleteBookmark();
              }}
              className="text=primary text-2xl cursor-pointer hover:opacity-50 transition-all duration-300"
            />
          ) : (
            <CiBookmark
              onClick={() => {
                setIsFavorite(true);
                onAddBookmark();
              }}
              className="text=primary text-2xl cursor-pointer hover:opacity-50 transition-all duration-300"
            />
          )}
          <RxCross2
            onClick={() => {
              setGeneratedIdeas(undefined);
              setFormData({
                keywords: [],
                ageGroup: "",
                tone: "",
              });
            }}
            className="text-2xl text-primary cursor-pointer hover:opacity-50 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratedIdeaModal;
