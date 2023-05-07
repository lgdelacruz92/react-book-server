import express from "express";

export const combineRouters = (routers: {
  [key: string]: express.Router;
}): express.Router => {
  // Create a new router to combine all the routes
  const combinedRouter = express.Router();

  // Mount each member of trelloRoutes onto the combined router
  Object.values(routers).forEach((router) => {
    combinedRouter.use(router);
  });
  return combinedRouter;
};
