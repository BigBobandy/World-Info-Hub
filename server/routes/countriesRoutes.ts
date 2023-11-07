import express from "express";
import { getCountries } from "../controllers/countriesControllers";

const router = express.Router();

router.get("/countries", getCountries);

export default router;
