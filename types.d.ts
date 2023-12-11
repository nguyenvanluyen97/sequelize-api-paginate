import { NextFunction, Request, Response } from "express";
import { IncludeOptions, WhereOptions } from "sequelize";
import { ModelStatic } from "sequelize";

export interface QueryResult {
  count: number;
  rows: Array<ModelStatic<any>>;
  currentPage: string | number;
  pageSize: number;
}

export interface MiddlewarePayload {
  pageSize: number;
  currentPage: number;
  sortField: string;
  sortOrder: string;
  filters: WhereOptions;
  rawFilter: string;
  dateField: Array<{
    opType: string;
    indexOp: number;
  }>;
}

export function middle(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;

export function query(
  model: ModelStatic<any>,
  payload: MiddlewarePayload,
  includeModels: Array<IncludeOptions>,
  isHierarchy: boolean,
  raw: boolean,
  nest: boolean,
  distinct: boolean,
  subQuery: any
): Promise<QueryResult>;
