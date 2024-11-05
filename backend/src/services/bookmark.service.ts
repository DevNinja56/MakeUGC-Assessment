import BookmarksModel from "../models/bookmark.model";
import { ObjectId } from "mongodb";

const createBookMark = async (userId: string, generateId: string) => {
  const bookMarkExist = await BookmarksModel.findOne({ userId, generateId });
  if (bookMarkExist) {
    throw new Error("Bookmark already exists");
  }

  const bookmark = await BookmarksModel.create({ userId, generateId });
  const populatedBookmark = await BookmarksModel.findById(
    bookmark._id
  ).populate("generateId");
  return populatedBookmark;
};

const getAllBookMarks = async (userId: string) => {
  return await BookmarksModel.find({ userId })
    .populate("generateId")
    .sort({ planToUse: -1 });
};

const getABookmark = async (userId: string, bookmarkId: string) => {
  if (!ObjectId.isValid(bookmarkId)) {
    throw new Error("Invalid bookmark ID");
  }

  const id = new ObjectId(bookmarkId);

  const bookmark = await BookmarksModel.findOne({
    _id: id,
    userId,
  }).populate("generateId");

  if (!bookmark) throw new Error("Bookmark not found");

  return bookmark;
};

const deleteABookmark = async (userId: string, bookmarkId: string) => {
  if (!ObjectId.isValid(bookmarkId)) {
    throw new Error("Invalid bookmark ID");
  }

  const id = new ObjectId(bookmarkId);

  const bookmark = await BookmarksModel.findOneAndDelete({
    _id: id,
    userId,
  }).populate("generateId");

  if (!bookmark) throw new Error("Bookmark not found");

  return bookmark;
};

const updateABookmark = async (
  userId: string,
  bookmarkId: string,
  body: { generateId: string; planToUse: boolean }
) => {
  if (!ObjectId.isValid(bookmarkId)) {
    throw new Error("Invalid bookmark ID");
  }

  const id = new ObjectId(bookmarkId);

  const bookmark = await BookmarksModel.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    { $set: body },
    { new: true, returnDocument: "after" }
  ).populate("generateId");

  if (!bookmark) throw new Error("Bookmark not found");

  return bookmark;
};

export default {
  createBookMark,
  getAllBookMarks,
  getABookmark,
  deleteABookmark,
  updateABookmark,
};
