import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response.util";
import BookmarkService from "../services/bookmark.service";

const createBookMark = async (req: Request, res: Response) => {
  try {
    const { generateId } = req.body;
    const userId = req.user || "";
    const bookmark = await BookmarkService.createBookMark(userId, generateId);

    successResponse(res, bookmark, "Bookmark created");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

const getAllBookMarks = async (req: Request, res: Response) => {
  try {
    const userId = req.user || "";
    const bookmarks = await BookmarkService.getAllBookMarks(userId);
    successResponse(res, bookmarks, "All bookmarks reterieved");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

const getABookMark = async (req: Request, res: Response) => {
  try {
    const bookmarkId = req.params.id;
    const userId = req.user || "";
    const bookmark = await BookmarkService.getABookmark(userId, bookmarkId);
    successResponse(res, bookmark, "Bookmark reterieved");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

const deleteABookmark = async (req: Request, res: Response) => {
  try {
    const bookmarkId = req.params.id;
    const userId = req.user || "";
    const bookmark = await BookmarkService.deleteABookmark(userId, bookmarkId);
    successResponse(res, bookmark, "Bookmark deleted");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

const updateABookmark = async (req: Request, res: Response) => {
  try {
    const bookmarkId = req.params.id;
    const userId = req.user || "";
    const body = req.body;
    const bookmark = await BookmarkService.updateABookmark(
      userId,
      bookmarkId,
      body
    );
    successResponse(res, bookmark, "Bookmark updated");
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

export default {
  createBookMark,
  getAllBookMarks,
  getABookMark,
  deleteABookmark,
  updateABookmark,
};
