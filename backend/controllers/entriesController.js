import { PrismaClient } from "@prisma/client";
import entrySchema from "../validation/entrySchema.js";

const prisma = new PrismaClient();

// Get paginated entries
export const getEntries = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const entries = await prisma.entry.findMany({
    skip: Number(skip),
    take: Number(limit),
    orderBy: { createdAt: "desc" },
  });

  res.json(entries);
};

// Create new entry
export const createEntry = async (req, res) => {
  try {
    const validated = await entrySchema.validate(req.body);

    const newEntry = await prisma.entry.create({
      data: validated,
    });

    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update entry
export const updateEntry = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const validated = await entrySchema.validate(req.body);
    const updated = await prisma.entry.update({
      where: { id },
      data: validated,
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete entry
export const deleteEntry = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.entry.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
