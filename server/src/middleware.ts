import { Request, Response, NextFunction } from "express";

export function checkOrigin(req: Request, res: Response, next: NextFunction) {
  const route = req.url;
  if (route !== "/questions") {
    const adminAuthToken = req.headers.adminauth;
    if (!adminAuthToken || adminAuthToken !== "colepalmer") res.send("You are not authorised to manage the quiz.");
  }
  next();
}
