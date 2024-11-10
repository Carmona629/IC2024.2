import { Esp } from "../entity/esp";

export interface EspRepository {
  create(esp: Esp): Promise<Esp>;
  update(esp: Esp): Promise<Esp>;
  find(): Promise<Esp[]>;
  findById(id: string): Promise<Esp | null>;
  findByName(name: string): Promise<Esp | null>;
  delete(esp: Esp): Promise<void>;
}
