import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  deleteApplication,
  employerGetAllApplication,
  jobSeekerGetAllApplication,
  postApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/post/:id",
  isAuthenticated,
  isAuthorized("Job Seeker"),
  postApplication
);

router.get(
  "/employer/getall",
  isAuthenticated,
  isAuthorized("Employer"),
  employerGetAllApplication
);

router.get(
  "/jobseeker/getall",
  isAuthenticated,
  isAuthorized("Job Seeker"),
  jobSeekerGetAllApplication
);

router.delete("/delete/:id", isAuthenticated, deleteApplication);

export default router;
