import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import  financialGoalsService  from "../services/goals.service"; // Placeholder for your service
import ResponseHandler from "../utils/responseHandler.util";
import { ValidationErr } from "../utils/errors.util";
//import  FinancialGoal  from "../types/goal.types"; // Define types for your data model
import { error } from "console";

// Fetch all financial goals
const findAll = async (req: Request, res: Response) => {
    
  try {

    const userId = parseInt(req.params.userId, 10); 

    if(isNaN(userId)){
        return ResponseHandler.error(req,res, error);
    }

    const goals = await financialGoalsService.findAllFinancialGoals(userId);
     ResponseHandler.success(req, res, {payload:goals});
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

// Fetch a single financial goal by ID
const findOne = async (req: Request, res: Response) => {
  try {

    const {id} = req.params;
    const goalId = parseInt(id,10); 

    if(isNaN(goalId)){
      return ResponseHandler.error(req,res, error);
  }

    

    const goal = await financialGoalsService.findOneFinancialGoal(goalId);
    if(!goal){
      return ResponseHandler.error(req,res, error);
    }

   

     ResponseHandler.success(req, res, {payload:goal});
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

// Create a new financial goal
const create = async (req: Request, res: Response) => {
  try {

    const {title, targetAmount, dueDate, userId} = req.body;

    if(!title || !targetAmount|| !userId ){
      return ResponseHandler.error(req,res,"Title, targetAmount, and userId are required.")
    }
    
    if(targetAmount <= 0){
      return ResponseHandler.error(req,res,"Target amount must be a positive number.");
    }

    //validate and format dueDate 

    let formattedDueDate : Date | null = null;
    if(dueDate){
      formattedDueDate = new Date(dueDate);
      if(isNaN(formattedDueDate.getTime())){
        return ResponseHandler.error(req,res,"Invalid dueDate format. Please provide a valid date.");
      }
    }

    // create the financial goal

    const goal = await financialGoalsService.createFinancialGoal({
      title,
      targetAmount,
      dueDate,
      userId,
    });

    ResponseHandler.success(req,res,{payload:goal});

  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

// Update an existing financial goal (PUT)
const put = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const goalId = parseInt(id,10);

    if(isNaN(goalId)){
      return ResponseHandler.error(req,res,error)
    }
   
    const {title,targetAmount,dueDate} = req.body;

    if(!title || ! targetAmount){
      return ResponseHandler.error(req,res, "title and target amount required");

    }

    const data = {id: goalId, title , targetAmount, dueDate};

    const updateGoal = await financialGoalsService.updateFinancialGoal(data);
    ResponseHandler.success(req,res,{payload: updateGoal});
    

    
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

// Update specific fields in a financial goal (PATCH)
const patch = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const goalId = parseInt(id,10);

    if(isNaN(goalId)){
      return ResponseHandler.error(req,res, 400);
    }

   const updates = matchedData(req); // extract sanitized data 

   if (!Object.keys(updates).length){
    return ResponseHandler.error(req,res,400);
   }

   const updatedGoal = await financialGoalsService.patchFinancialGoal(goalId,updates);

   if (!updatedGoal){
    return ResponseHandler.error(req,res,404);
   }
  } catch (err) {
    await ResponseHandler.error(req, res, err);
  }
};

// Delete a financial goal
const remove = async (req: Request, res: Response) => {
  try {
    
    const {id} = req.params;
    const goalId = parseInt(id, 10);

  if(isNaN(goalId)){
    return ResponseHandler.error(req,res,error);
  }

    await financialGoalsService.deleteFinancialGoal(goalId);
    ResponseHandler.success(req,res,{ message: 'Goal deleted successfully' })
  } catch (err) {
     ResponseHandler.error(req, res, err);
  }
};

export default { findAll, findOne, create, put, patch, remove };
