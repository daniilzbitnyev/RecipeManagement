import { LazyExoticComponent } from "react";

export type TRoute = {
  name: string;
  path: string;
  Component: LazyExoticComponent<() => JSX.Element>;
}