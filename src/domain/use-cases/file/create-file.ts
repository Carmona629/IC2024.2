import { Either, left, right } from "../../../core/either";
import { File } from "../../entity/file";
import { FileRepository } from "../../repository/file";

export interface CreateFileDTO {
  name: string;
  url: string;
  esp_id: string;
}

type CreateFileResponse = Promise<Either<Error, File>>;

export class CreateFile {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(data: CreateFileDTO): CreateFileResponse {
    const file = File.create({
      name: data.name,
      url: data.url,
      esp_id: data.esp_id,
    });
    const response = await this.fileRepository.save(file);
    return response ? right(response) : left(new Error("Error on save file"));
  }
}