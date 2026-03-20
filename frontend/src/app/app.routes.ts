import { Routes } from "@angular/router";
import { AssociationsComponent } from "./components/associations/associations.component";

import { EntitiesComponent } from "./components/entities/entities.component";

import { UsersComponent } from "./components/users/users.component";

export const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "entities", component: EntitiesComponent },
  { path: "associations", component: AssociationsComponent },
  { path: "", redirectTo: "/users", pathMatch: "full" },
];
