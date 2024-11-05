import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchRequest } from "../../utils/axios/fetch";
import { API_ENDPOINTS } from "../../constant/api-endpoints";
import ScreenLoader from "../../components/common/loaderSpinner/ScreenLoader";
import { GENERATE_IDEAS_RESPONSE_TYPE } from "../../types";
import Input from "../../components/common/input";
import SingleIdea from "../../components/pages/idea/singleIdea";

const Ideas = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ideas, setIdeas] = useState<GENERATE_IDEAS_RESPONSE_TYPE[]>([]);
  const [search, setSearch] = useState<string | undefined>();

  const getAllIdeas = () => {
    setLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.GENERATE,
      type: "get",
    })
      .then((res) => {
        setIdeas(res?.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllIdeas();
  }, []);

  const filteredIdeas = ideas?.filter((item) =>
    item?.description?.toLowerCase().includes(search?.toLocaleLowerCase() || "")
  );

  if (loading) return <ScreenLoader />;

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-12 py-8 min-h-screen">
      <Input
        padding="py-2 pl-4"
        className="w-full border-b hover:border-primary"
        placeHolder="Search Ideas..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e?.target?.value)
        }
      />
      <h1 className="text-primary text-xl font-bold">Your Ideas</h1>
      <div className="grid grid-cols-3 gap-7">
        {ideas && ideas.length > 0 ? (
          filteredIdeas.length > 0 ? (
            filteredIdeas.map((item) => (
              <SingleIdea key={"ideas--" + item?._id} idea={item} />
            ))
          ) : (
            <p className="text-sm">Not Found!</p>
          )
        ) : (
          <p className="text-sm">No Ideas Found!</p>
        )}
      </div>
    </div>
  );
};

export default Ideas;
