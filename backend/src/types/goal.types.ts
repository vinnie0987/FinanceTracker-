export type User = {
    id: number;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  };


  export interface FinancialGoal{
    id: number;
    name: string ;
    targetAmount: number;
    savedAmount: number;
    dueDate: Date;
    userId: number;
  }
  