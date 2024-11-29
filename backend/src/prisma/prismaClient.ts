import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient(); // initializes a prisma client instance 

export {prisma}; // export prisma instance to be used in other files 

