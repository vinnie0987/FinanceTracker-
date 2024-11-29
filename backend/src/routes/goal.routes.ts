import { Router } from "express";
import  goals  from "../controllers/goal.Controller";
import { checkSchema } from "express-validator";
import { userSchema } from "../middleware/validators";

const router = Router();

router
  .route("/goals")
  .get(goals.findAll)
  .post(checkSchema(userSchema.create.body, ["body"]), goals.create);

router
  .route("/goals/:id")
  .get(goals.findOne)
  .put(
    checkSchema(userSchema.put.params, ["params"]),
    checkSchema(userSchema.put.body, ["body"]),
    goals.put,
  )
  .patch(
    checkSchema(userSchema.patch.params, ["params"]),
    checkSchema(userSchema.patch.body, ["body"]),
    goals.patch,
  )
  .delete(checkSchema(userSchema.delete.params), goals.remove);

export default router;
