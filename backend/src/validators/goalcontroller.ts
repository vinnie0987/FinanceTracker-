import { body, param } from "express-validator"; // Import validators from express-validator

// Validation rules for creating a goal
export const createGoalMiddleware = [
  body("title")
    .notEmpty().withMessage("Title cannot be empty") // Ensure title is not empty
    .isString().withMessage("Title must be a string"), // Ensure title is a string
  body("targetAmount")
    .notEmpty().withMessage("Target amount cannot be empty") // Ensure targetAmount is not empty
    .isNumeric().withMessage("Target amount must be a number"), // Ensure targetAmount is a number
  body("dueDate")
    .notEmpty().withMessage("Due date cannot be empty") // Ensure dueDate is not empty
    .isISO8601().withMessage("Due date must be a valid date"), // Ensure dueDate is a valid date
  body("userId")
    .notEmpty().withMessage("User ID cannot be empty") // Ensure userId is not empty
    .isString().withMessage("User ID must be a valid string") // Ensure userId is a string
];

// Validation rules for updating a goal
export const updateGoalMiddleware = [
  param("id")
    .notEmpty().withMessage("Goal ID cannot be empty") // Ensure goal ID is not empty
    .isInt().withMessage("Goal ID must be an integer"), // Ensure goal ID is an integer
  body("savedAmount")
    .notEmpty().withMessage("Saved amount cannot be empty") // Ensure savedAmount is not empty
    .isNumeric().withMessage("Saved amount must be a number") // Ensure savedAmount is a number
];

// Validation rules for deleting a goal
export const deleteGoalMiddleware = [
  param("id")
    .notEmpty().withMessage("Goal ID cannot be empty") // Ensure goal ID is not empty
    .isInt().withMessage("Goal ID must be an integer") // Ensure goal ID is an integer
];

// Validation rules for getting goals (optional, if you need any filters or parameters)
export const getGoalsMiddleware = []; // Currently empty, but you can add filters here

export default {
  create: createGoalMiddleware,
  update: updateGoalMiddleware,
  delete: deleteGoalMiddleware,
  get: getGoalsMiddleware,
};
