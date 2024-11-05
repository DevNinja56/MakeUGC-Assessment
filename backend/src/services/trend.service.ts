import { getJson } from "serpapi";
import { envConstants } from "../constants";
import TrendModel from "../models/trend.model";

const getAllTrends = async (geo: string) => {
  let trendFromBackend = await TrendModel.findOne({ geo });

  if (trendFromBackend && trendFromBackend.expiresIn > new Date()) {
    return trendFromBackend.trends;
  }

  const res = await getJson({
    engine: "google_trends_trending_now",
    geo,
    api_key: envConstants.SerpApi,
  });

  const newTrends = res["trending_searches"].slice(0, 10);

  if (trendFromBackend) {
    trendFromBackend.trends = newTrends;
    trendFromBackend.expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24);
    await trendFromBackend.save();
  } else {
    trendFromBackend = new TrendModel({
      geo,
      trends: newTrends,
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    await trendFromBackend.save();
  }

  return newTrends;
};

export default {
  getAllTrends,
};
