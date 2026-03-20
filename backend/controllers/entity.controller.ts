import { Request, Response } from 'express';
import { Entity, User } from '../models/index.js';

export const getEntities = async (req: Request, res: Response) => {
  try {
    const entities = await Entity.findAll({ include: User });
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entities' });
  }
};

export const getEntityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity = await Entity.findByPk(req.params['id'] as string, { include: User });
    if (!entity) {
      res.status(404).json({ error: 'Entity not found' });
      return;
    }
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entity' });
  }
};

export const createEntity = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const entity = await Entity.create({ name });
    res.status(201).json(entity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create entity' });
  }
};

export const updateEntity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const entity = await Entity.findByPk(req.params['id'] as string);
    if (!entity) {
      res.status(404).json({ error: 'Entity not found' });
      return;
    }
    await entity.update({ name });
    res.status(200).json(entity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update entity' });
  }
};

export const deleteEntity = async (req: Request, res: Response): Promise<void> => {
  try {
    const entity = await Entity.findByPk(req.params['id'] as string);
    if (!entity) {
      res.status(404).json({ error: 'Entity not found' });
      return;
    }
    await entity.destroy();
    res.status(200).json({ message: 'Entity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entity' });
  }
};
