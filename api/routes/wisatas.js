import express from "express";
import { countByCity, countByType, createWisata, deleteWisata, getWisata, getWisatas, updateWisata } from "../controllers/wisata.js";
import Wisata from "../models/Wisata.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createWisata);

//UPDATE
router.put("/:id", verifyAdmin, updateWisata);
//DELETE
router.delete("/:id", verifyAdmin, deleteWisata);
//GET

router.get("/find/:id", getWisata);
//GET ALL

router.get("/", getWisatas);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
// router.get("/room/:id", getWisataRooms);

export default router;
