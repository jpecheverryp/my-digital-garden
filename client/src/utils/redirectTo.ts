import { NavigateFunction } from "react-router-dom";
export async function redirectTo(navigate: NavigateFunction, location: string) {
  navigate(location);
}