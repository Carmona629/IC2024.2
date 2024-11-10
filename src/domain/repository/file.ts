import { File } from "../entity/file";

export interface FileRepository {
  save(file: File): Promise<File>;
  find(): Promise<File[]>;
  findById(id: string): Promise<File | null>;
  delete(file: File): Promise<void>;
  findByEspId(esp_id: string): Promise<File[]>;
  findByEspIdAndName(esp_id: string, name: string): Promise<File[]>
}
