import express from "express";
import {container} from "tsyringe";
import  OnboardController from "../controllers/onboard.controller"
const onbaordController: any = container.resolve(OnboardController)

const router = express.Router();
router.post("/me", onbaordController.doSomething);

export default router;
