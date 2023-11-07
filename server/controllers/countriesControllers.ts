import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await prisma.country.findMany();
    const json = JSON.stringify(
      countries,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // Convert BigInt to string since JSON.stringify() doesn't like BigInt
    );
    res.setHeader("Content-Type", "application/json");
    res.send(json);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: error });
  }
};
