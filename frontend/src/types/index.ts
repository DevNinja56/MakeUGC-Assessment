export type signInForm = {
  email: string;
  password: string;
};

export interface userType {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type OptionType = { label: string; value: string };

export type GENERATE_IDEAS_TYPE = {
  keywords: string[];
  ageGroup: string;
  tone: string;
};

export type GENERATE_IDEAS_RESPONSE_TYPE = {
  keywords: string[];
  ageGroup: string;
  createdAt: string;
  tone: string;
  _id: string;
  description: string;
  updatedAt: string;
  __v: string;
};

export type BOOKMARKS_TYPE = {
  createdAt: string;
  generateId: GENERATE_IDEAS_RESPONSE_TYPE;
  planToUse: boolean;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
};

export type TRENDS_TYPE = {
  query: string;
};
