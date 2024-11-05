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
  handleModal: (val: boolean) => void;
  handleSelectedVal: (val: BOOKMARKS_TYPE) => void;
}

const SingleBookmark = ({
  bookmark,
  getAllBookmarks,
  handleModal,
  handleSelectedVal,
}: propTyeps) => {
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
      <p
        onClick={() => {
          handleSelectedVal(bookmark);
          handleModal(true);
        }}
        className="hover:cursor-pointer"
      >
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
          <div className="relative group">
            <FaStar
              onClick={onHandleChangePlan}
              className="text-base cursor-pointer text-primary hover:opacity-50 transition-all duration-300"
            />
            <div className="transition-all group-hover:opacity-100 opacity-0 bottom-[-36px] left-[-32px] px-2 py-1 bg-primary text-white text-nowrap absolute z-50 rounded-md  before:content-[''] before:absolute before:top-[-8px] before:left-1/2 before:transform before:-translate-x-1/2 before:border-[10px] before:border-transparent before:border-b-primary before:border-t-0">
              <p>Pin to top</p>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <CiStar
              onClick={onHandleChangePlan}
              className="text-base cursor-pointer text-primary hover:opacity-50 transition-all duration-300"
            />
            <div className="transition-all group-hover:opacity-100 opacity-0 bottom-[-36px] left-[-32px] px-2 py-1 bg-primary text-white text-nowrap absolute z-50 rounded-md  before:content-[''] before:absolute before:top-[-8px] before:left-1/2 before:transform before:-translate-x-1/2 before:border-[10px] before:border-transparent before:border-b-primary before:border-t-0">
              <p>Pin to top</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBookmark;
