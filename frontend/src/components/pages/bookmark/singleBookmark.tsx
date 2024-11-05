import React, { useState } from "react";
import { BOOKMARKS_TYPE } from "../../../types";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { fetchRequest } from "../../../utils/axios/fetch";
import { API_ENDPOINTS } from "../../../constant/api-endpoints";
import toast from "react-hot-toast";
import LoaderSpinner from "../../common/loaderSpinner";

interface propTyeps {
  bookmark: BOOKMARKS_TYPE;
  getAllBookmarks: () => void;
}

const SingleBookmark = ({ bookmark, getAllBookmarks }: propTyeps) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [planLoading, setPlanLoading] = useState<boolean>(false);

  const onHandleDeleteBookmark = () => {
    setDeleteLoading(true);
    fetchRequest({
      url: `${API_ENDPOINTS.BOOKMARK}/${bookmark?._id}`,
      type: "delete",
    })
      .then((res) => {
        getAllBookmarks();
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      })
      .finally(() => setDeleteLoading(false));
  };

  const onHandleChangePlan = () => {
    setPlanLoading(true);
    fetchRequest({
      url: `${API_ENDPOINTS.BOOKMARK}/${bookmark?._id}`,
      type: "patch",
      body: {
        planToUse: bookmark?.planToUse === true ? false : true,
      },
    })
      .then((res) => {
        getAllBookmarks();
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      })
      .finally(() => setPlanLoading(false));
  };

  return (
    <div className="w-full bg-white border-2 border-primary rounded-md py-7 px-5 text-primary relative text-sm font-medium">
      <p>
        {bookmark?.generateId?.description?.slice(0, 100) +
          (bookmark?.generateId?.description?.length > 100 ? "..." : "") ||
          "No description available"}
      </p>
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {deleteLoading ? (
          <LoaderSpinner color="text-primary" />
        ) : (
          <PiBookmarkSimpleFill
            onClick={onHandleDeleteBookmark}
            className="text-base cursor-pointer hover:opacity-50 transition-all duration-300"
          />
        )}
        {planLoading ? (
          <LoaderSpinner color="text-white" />
        ) : bookmark?.planToUse ? (
          <FaStar
            onClick={onHandleChangePlan}
            className="text-base cursor-pointer text-primary hover:opacity-50 transition-all duration-300"
          />
        ) : (
          <CiStar
            onClick={onHandleChangePlan}
            className="text-base cursor-pointer text-primary hover:opacity-50 transition-all duration-300"
          />
        )}
      </div>
    </div>
  );
};

export default SingleBookmark;
