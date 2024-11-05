import Joi from "joi";
import { objectIdRegex } from "../utils/objectIdRegex.util";

const createBookmark = Joi.object({
  generateId: Joi.string().pattern(objectIdRegex).required().messages({
    "string.pattern.base":
      "generateId must be a valid ObjectId (24 hexadecimal characters).",
    "string.empty": "generateId is required.",
  }),
});

const updateBookmark = Joi.object({
  generateId: Joi.string().pattern(objectIdRegex).messages({
    "string.pattern.base":
      "generateId must be a valid ObjectId (24 hexadecimal characters).",
  }),
  planToUse: Joi.boolean(),
});

export { createBookmark, updateBookmark };
