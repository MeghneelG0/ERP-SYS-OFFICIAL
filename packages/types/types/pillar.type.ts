import { z } from "zod";
import { PillarSchema } from "../schema/pillar.schema";

export type CreatePillarTemplateInput = z.infer<typeof PillarSchema>;

export interface PillarInstance {
  id: number;
  name: string;
  pillar_value?: number; // Weight of the pillar (0-1)
  description?: string; // Description of the pillar
  counts: {
    assignedkpi: number;
  };
}
