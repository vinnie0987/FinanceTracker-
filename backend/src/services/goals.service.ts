import { PrismaClient } from "@prisma/client";
import { NotFoundErr } from "../utils/errors.util";

const prisma = new PrismaClient();

// Find all financial goals for a user
const findAllFinancialGoals = async (userId: number) => {
  try {
    const goals = await prisma.financialGoal.findMany({
      where: { userId, deletedAt: null },
      include: { progresses: true },
    });
    return goals;
  } catch (err) {
    throw err;
  }
};

// Find a specific financial goal by ID
const findOneFinancialGoal = async (id: number) => {
  try {
    const goal = await prisma.financialGoal.findUnique({
      where: { id },
      include: { progresses: true },
    });

    if (!goal || goal.deletedAt) {
      throw new NotFoundErr("Financial goal not found.");
    }

    return goal;
  } catch (err) {
    throw err;
  }
};

// Create a new financial goal for a user
const createFinancialGoal = async ({
  userId,
  title,
  targetAmount,
  dueDate,
}: {
  userId: number;
  title: string;
  targetAmount: number;
  dueDate?: Date;
}) => {
  try {
    const goal = await prisma.financialGoal.create({
      data: { userId, title, targetAmount, dueDate },
    });
    return goal;
  } catch (err) {
    throw err;
  }
};

// Update (PUT) a financial goal
const updateFinancialGoal = async ({
  id,
  title,
  targetAmount,
  dueDate,
}: {
  id: number;
  title: string;
  targetAmount: number;
  dueDate?: Date;
}) => {
  try {
    const exists = await prisma.financialGoal.findUnique({ where: { id } });

    if (!exists || exists.deletedAt) {
      throw new NotFoundErr("Financial goal not found.");
    }

    const goal = await prisma.financialGoal.update({
      where: { id },
      data: { title, targetAmount, dueDate },
    });

    return goal;
  } catch (err) {
    throw err;
  }
};

// Partially update (PATCH) a financial goal
const patchFinancialGoal = async (
  id: number,
  data: Partial<{
    title: string;
    targetAmount: number;
    currentAmount: number;
    dueDate?: Date;
  }>
) => {
  try {
    const exists = await prisma.financialGoal.findUnique({ where: { id } });

    if (!exists || exists.deletedAt) {
      throw new NotFoundErr("Financial goal not found.");
    }

    const goal = await prisma.financialGoal.update({
      where: { id },
      data,
    });

    return goal;
  } catch (err) {
    throw err;
  }
};

// Delete (soft delete) a financial goal
const deleteFinancialGoal = async (id: number) => {
  try {
    const goal = await prisma.financialGoal.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (!goal) {
      throw new NotFoundErr("Financial goal not found.");
    }

    return goal;
  } catch (err) {
    throw err;
  }
};

// Record progress for a financial goal
const addProgress = async ({
  financialGoalId,
  amount,
}: {
  financialGoalId: number;
  amount: number;
}) => {
  try {
    const goal = await prisma.financialGoal.findUnique({
      where: { id: financialGoalId },
    });

    if (!goal || goal.deletedAt) {
      throw new NotFoundErr("Financial goal not found.");
    }

    const progress = await prisma.progress.create({
      data: { financialGoalId, amount },
    });

    // Update the current amount of the financial goal
    await prisma.financialGoal.update({
      where: { id: financialGoalId },
      data: { currentAmount: goal.currentAmount + amount },
    });

    return progress;
  } catch (err) {
    throw err;
  }
};

export default {
  findAllFinancialGoals,
  findOneFinancialGoal,
  createFinancialGoal,
  updateFinancialGoal,
  patchFinancialGoal,
  deleteFinancialGoal,
  addProgress,
};
