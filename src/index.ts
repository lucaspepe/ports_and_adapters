import "reflect-metadata";
import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";

import { TsyringeDependencyInjectionAdapter } from "./infra/shared/injection-container/tsrynge-injection.adapter";

const httpServer = new ExpressAdapter();
const dependecyInjection = new TsyringeDependencyInjectionAdapter();
const router = new Router(httpServer, dependecyInjection);

router.init();
httpServer.listen(3000);
