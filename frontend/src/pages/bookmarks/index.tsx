import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchRequest } from "../../utils/axios/fetch";
import { API_ENDPOINTS } from "../../constant/api-endpoints";
import ScreenLoader from "../../components/common/loaderSpinner/ScreenLoader";
import { BOOKMARKS_TYPE } from "../../types";
import SingleBookmark from "../../components/pages/bookmark/singleBookmark";
import Input from "../../components/common/input";

const Bookmarks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<BOOKMARKS_TYPE[]>([]);
  const [search, setSearch] = useState<string | undefined>();

  const getAllBookmarks = () => {
    setLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.BOOKMARK,
      type: "get",
    })
      .then((res) => {
        setBookmarks(res?.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllBookmarks();
  }, []);

  const filteredBookmarks = bookmarks?.filter((item) =>
    item?.generateId?.description
      ?.toLowerCase()
      .includes(search?.toLocaleLowerCase() || "")
  );

  if (loading) return <ScreenLoader />;

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-12 py-8 h-screen">
      <Input
        padding="py-2 pl-4"
        className="w-full border-b hover:border-primary"
        placeHolder="Search Bookmarks..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e?.target?.value)
        }
      />
      <h1 className="text-primary text-xl font-bold">Bookmarks</h1>
      <div className="grid grid-cols-3 gap-7">
        {bookmarks && bookmarks.length > 0 ? (
          filteredBookmarks.length > 0 ? (
            filteredBookmarks.map((item) => (
              <SingleBookmark
                key={"bookmark--" + item?._id}
                bookmark={item}
                getAllBookmarks={getAllBookmarks}
              />
            ))
          ) : (
            <p className="text-sm">Not Found!</p>
          )
        ) : (
          <p className="text-sm">No Bookmarks Found!</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;