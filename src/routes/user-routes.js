import express from "express";
import {createCtm,getAllctm, getCtmById,deleteCtm,updateCtm} from '../controllers/user-controller.js'
export const user_route = express.Router();
user_route.get('/:id',getCtmById)
user_route.get('/',getAllctm)
user_route.post('/',createCtm)
user_route.delete('/:id',deleteCtm)
user_route.patch('/',updateCtm)
export default user_route;