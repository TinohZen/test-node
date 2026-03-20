import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addEntityToUser,
  getUserEntities,
  updateUserEntity,
  deleteUserEntity,
} from "../controllers/user.controller.js";
import {
  getEntities,
  getEntityById,
  createEntity,
  updateEntity,
  deleteEntity,
} from "../controllers/entity.controller.js";

const router = Router();

// User routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/user-entities", getUserEntities);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/user-entities", addEntityToUser);
router.put("/user-entities/:id", updateUserEntity);
router.delete("/user-entities/:id", deleteUserEntity);

// Entity routes
router.get("/entities", getEntities);
router.get("/entities/:id", getEntityById);
router.post("/entities", createEntity);
router.put("/entities/:id", updateEntity);
router.delete("/entities/:id", deleteEntity);

export default router;
