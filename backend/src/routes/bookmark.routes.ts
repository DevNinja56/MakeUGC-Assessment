import { Router } from "express";
import BookmarkController from "../controllers/bookmark.controller";
import validateRequest from "../middlewares/validation";
import { createBookmark, updateBookmark } from "../joiSchemas/bookmark.joi";

const router = Router();

router.post(
  "/",
  validateRequest(createBookmark),
  BookmarkController.createBookMark
);

router.get("/", BookmarkController.getAllBookMarks);

router.get("/:id", BookmarkController.getABookMark);

router.delete("/:id", BookmarkController.deleteABookmark);

router.patch(
  "/:id",
  validateRequest(updateBookmark),
  BookmarkController.updateABookmark
);

export default router;
