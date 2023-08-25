import { Igreja, Local } from "@prisma/client";

interface IIgreja extends Igreja {
  local: Local;
}
