// Initializes the `users` service on path `/users`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application, CustomServiceAddons } from "../../declarations";
import { Articles } from "./articles.class";
import hooks from "./articles.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    "articles": Articles & ServiceAddons<unknown> & CustomServiceAddons;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get("paginate"),
    multi: true
  };

  // Initialize our service with any options it requires
  app.use("/articles", new Articles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("articles");

  service.hooks(hooks);
}
