import Joi from "joi";
import { objectIdRegex } from "../utils/objectIdRegex.util";

const generateScriptSchema = Joi.object({
  keywords: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.base": "Keywords should be an array of strings.",
      "array.min": "At least one keyword is required.",
      "string.empty": "Each keyword should be a non-empty string.",
    }),

  tone: Joi.string().required().messages({
    "string.base": "Tone should be a string.",
    "string.empty": "Tone is required.",
  }),

  ageGroup: Joi.string().required().messages({
    "string.empty": "Age group is required.",
  }),
});

const bulkUpdateUserInGenerate = Joi.object({
  data: Joi.array()
    .items(
      Joi.string().pattern(objectIdRegex).required().messages({
        "string.pattern.base":
          "generateId must be a valid ObjectId (24 hexadecimal characters).",
        "string.empty": "generateId is required.",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "data should be an array of strings.",
      "array.min": "At least one string is required.",
      "string.empty": "Each string should be a non-empty string.",
    }),
});

export { generateScriptSchema, bulkUpdateUserInGenerate };
