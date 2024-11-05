import { useEffect, useState } from "react";
import Button from "../../components/common/button";
import GoogleTrendsContainer from "../../components/pages/home/googleTrendsContainer";
import { customStyles } from "../../styles/customStyle";
import Select from "react-select";
import {
  GENERATE_IDEAS_RESPONSE_TYPE,
  GENERATE_IDEAS_TYPE,
  TRENDS_TYPE,
} from "../../types";
import { TagsInput } from "react-tag-input-component";
import { fetchRequest } from "../../utils/axios/fetch";
import { API_ENDPOINTS } from "../../constant/api-endpoints";
import toast from "react-hot-toast";
import LoaderSpinner from "../../components/common/loaderSpinner";
import GeneratedIdeaModal from "../../components/modal/generatedIdeaModal";
import { useUserAuth } from "../../hooks/auth-hook";

const Home = () => {
  const { isAuthenticated } = useUserAuth();
  const [formData, setFormData] = useState<GENERATE_IDEAS_TYPE>({
    keywords: [],
    ageGroup: "",
    tone: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [trendsLoading, setTrendsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    keywords: "",
    ageGroup: "",
    tone: "",
  });
  const [generatedIdeas, setGeneratedIdeas] =
    useState<GENERATE_IDEAS_RESPONSE_TYPE>();
  const [trends, setTrends] = useState<TRENDS_TYPE[]>([]);
  const generatedContentIds = JSON.parse(
    localStorage.getItem("generatedContentIds") ?? "[]"
  );

  const getAllTrends = () => {
    setTrendsLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.TRENDS,
      type: "get",
    })
      .then((res) => {
        setTrends(res?.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      })
      .finally(() => setTrendsLoading(false));
  };

  const generateBulkUpdate = (generatedContentId: string[]) => {
    fetchRequest({
      url: API_ENDPOINTS.GENERATE_BULK_UPDATE,
      type: "patch",
      body: { data: generatedContentId },
    })
      .then(() => {
        localStorage.clear();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors);
      });
  };

  useEffect(() => {
    getAllTrends();
    if (
      isAuthenticated &&
      generatedContentIds &&
      generatedContentIds.length > 0
    ) {
      generateBulkUpdate(generatedContentIds);
    }
  }, []);

  const handleSubmit = () => {
    const errors = {
      keywords: formData?.keywords?.length < 1 ? "keywords is required" : "",
      ageGroup: formData.ageGroup === "" ? "audience is required" : "",
      tone: formData.tone === "" ? "tone is required" : "",
    };
    if (errors.keywords || errors.ageGroup || errors.tone) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.GENERATE,
      type: "post",
      body: formData,
    })
      .then((res) => {
        setGeneratedIdeas(res?.data);
        if (!isAuthenticated) {
          const existingContentIds = JSON.parse(
            localStorage.getItem("generatedContentIds") ?? "[]"
          );
          const updatedContentIds = [...existingContentIds, res?.data?._id];
          localStorage.setItem(
            "generatedContentIds",
            JSON.stringify(updatedContentIds)
          );
        } else {
          generateBulkUpdate([res?.data?._id]);
        }
        toast.success(res?.message);
        setFormData({
          keywords: [],
          ageGroup: "",
          tone: "",
        });
        setErrors({
          keywords: "",
          ageGroup: "",
          tone: "",
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.errors[0]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-primary py-10">
      <div className="w-11/12 md:w-8/12 lg:w-7/12 xl:w-5/12 py-5 md:py-7 px-3 md:px-8 lg:px-12 bg-white rounded-lg flex flex-col items-center gap-7 md:gap-10">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-primary text-xl lg:text-2xl font-bold">
            Content Idea Generator
          </h1>
          <p className="text-center text-xs md:text-sm lg:text-base">
            Unleash your creativity with our intelligent idea generator
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-8 text-xl font-bold w-full justify-center">
            Generating
            <div className="loader flex items-center"></div>
          </div>
        ) : generatedIdeas ? (
          <GeneratedIdeaModal
            generatedIdeas={generatedIdeas}
            setGeneratedIdeas={setGeneratedIdeas}
            setFormData={setFormData}
          />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-5 w-full"
          >
            <div className="flex flex-col w-full gap-2">
              <h2 className="text-xs lg:text-sm text-secondary">
                Select Google Trending Ideas
              </h2>
              <div className="flex flex-wrap gap-4 py-4 md:py-5 px-2 md:px-4 bg-primary/10 w-full rounded-md">
                {trendsLoading ? (
                  <div className="w-full flex justify-center">
                    <LoaderSpinner color="text-primary" />
                  </div>
                ) : trends && trends.length > 0 ? (
                  trends?.map(({ query }, index) => (
                    <GoogleTrendsContainer
                      key={"google-trends-" + query + index}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          keywords: prev.keywords.includes(query)
                            ? prev.keywords.filter(
                                (keyword) => keyword !== query
                              )
                            : [...prev.keywords, query],
                        }));
                      }}
                      text={`${query}`}
                      isTrending={formData.keywords.includes(query)}
                    />
                  ))
                ) : (
                  "No trends found"
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">
                Enter a Keyword or Topic:
              </p>
              <TagsInput
                onChange={(updatedKeywords) => {
                  setFormData((prev) => ({
                    ...prev,
                    keywords: Array.from(new Set(updatedKeywords)),
                  }));
                }}
                value={formData.keywords}
                placeHolder="e.g., fitness, travel, tech"
                disableBackspaceRemove={true}
              />
              <p className="text-xs text-red my-1">{errors.keywords}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-semibold">
                  Select Audience
                </p>
                <Select
                  styles={customStyles}
                  options={[
                    {
                      label: "Young Adults",
                      value: "youndAdults",
                    },
                    {
                      label: "Buisness Professionals",
                      value: "buisnessProfessionals",
                    },
                    {
                      label: "Fitness Enthusiasts",
                      value: "fitnessEnthusiasts",
                    },
                    {
                      label: "Tech Lovers",
                      value: "techLovers",
                    },
                  ].map(({ label, value }) => ({
                    label: label,
                    value: value,
                  }))}
                  placeholder="Select Audience"
                  onChange={(e: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      ageGroup: e?.value,
                    }))
                  }
                />
                <p className="text-xs text-red">{errors.ageGroup}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-semibold">Select Tone</p>
                <Select
                  styles={customStyles}
                  options={[
                    {
                      label: "Informative",
                      value: "informative",
                    },
                    {
                      label: "Playful",
                      value: "buisnessProfessionals",
                    },
                    {
                      label: "Inspirational",
                      value: "inspirational",
                    },
                    {
                      label: "Humurous",
                      value: "humurous",
                    },
                  ].map(({ label, value }) => ({
                    label: label,
                    value: value,
                  }))}
                  placeholder="Select Tone"
                  onChange={(e: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      tone: e?.value,
                    }))
                  }
                />
                <p className="text-xs text-red">{errors.tone}</p>
              </div>
            </div>
            <Button
              text="Generate Ideas"
              className="w-full"
              animation
              isLoader={loading}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
