import { Evento, Local } from "@prisma/client";

interface IEvento extends Evento {
  local: Local;
}
