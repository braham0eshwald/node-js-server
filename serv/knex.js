import Knex from "knex";
import { PG_URI } from "./src/utils/config.js";

let knex;

export async function getKnex() {
  if (knex) {
    return knex;
  } else {
    knex = Knex(PG_URI);
    return knex;
  }
}
