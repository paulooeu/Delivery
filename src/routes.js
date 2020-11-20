import { Router } from "express";
import IngredienteController from './app/Controller/Ingrediente'

const routes = new Router();

routes.get("/recipes", IngredienteController.store);


export default routes;
