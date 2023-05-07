import stripeRoutes from "./stripe.routes";
import chatRoutes from "./chat.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import * as trelloRoutes from "./trello/index.routes";
import { combineRouters } from "./utils/combine-routers.utils";

const trelloRouters = combineRouters(trelloRoutes);
export { stripeRoutes, chatRoutes, userRoutes, authRoutes, trelloRouters };
