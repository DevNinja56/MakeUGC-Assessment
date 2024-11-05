declare module "google-trends-api" {
  interface DailyTrendsOptions {
    geo: string;
  }

  interface RealTimeTrendsOptions {
    geo: string;
    category: string;
  }

  function dailyTrends(options: DailyTrendsOptions): Promise<string>;
  function realTimeTrends(options: RealTimeTrendsOptions): Promise<string>;

  export { dailyTrends, realTimeTrends };
}
