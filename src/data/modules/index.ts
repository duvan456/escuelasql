import { selectBasico } from './01-select-basico';
import { whereBasico } from './02-where';
import { orderBy } from './03-order-by';
import { funcionesAgregadas } from './04-agregacion';
import { groupBy } from './05-group-by';
import { having } from './06-having';
import { joins } from './07-joins';
import { subconsultas } from './08-subconsultas';

export const allModules = [
  selectBasico,
  whereBasico,
  orderBy,
  funcionesAgregadas,
  groupBy,
  having,
  joins,
  subconsultas
];

export * from './01-select-basico';
export * from './02-where';
export * from './03-order-by';
export * from './04-agregacion';
export * from './05-group-by';
export * from './06-having';
export * from './07-joins';
export * from './08-subconsultas';
