import { Request, Response } from "express";
import { User, Entity, UserEntity } from "../models/index.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ include: Entity });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id, { include: Entity });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { username, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    await user.update({ username, email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const addEntityToUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, entityId } = req.body;

    const user = await User.findByPk(Number(userId));
    const entity = await Entity.findByPk(Number(entityId));

    if (!user || !entity) {
      res.status(404).json({ error: "User or Entity not found" });
      return;
    }

    await (user as any).addEntity(entity);
    res.status(200).json({ message: "Entity added to user successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to associate entity to user" });
  }
};

export const getUserEntities = async (req: Request, res: Response) => {
  try {
    const associations = await UserEntity.findAll();
    res.status(200).json(associations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch associations" });
  }
};

export const updateUserEntity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { userId, entityId } = req.body;

    const association = await UserEntity.findByPk(id);

    if (!association) {
      res.status(404).json({ error: "Association non trouvée" });
      return;
    }

    await association.update({ userId, entityId });
    res.status(200).json({
      message: "Association mise à jour avec succès",
      association,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
};

export const deleteUserEntity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const association = await UserEntity.findByPk(id);

    if (!association) {
      res.status(404).json({ error: "Association non trouvée" });
      return;
    }

    await association.destroy();
    res.status(200).json({ message: "Association supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
};
