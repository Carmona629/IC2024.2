import { Either, left, right } from "../../../core/either";
import { File } from "../../entity/file";
import { FileRepository } from "../../repository/file";

export interface GetFileDTO {
  id?: string;
  esp_id?: string;
}

type GetFileResponse = Promise<Either<Error, File | File[]>>;

export class GetFile {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(data: GetFileDTO): GetFileResponse {
    let response: File | File[] | null;
    if (data.id) {
      response = await this.fileRepository.findById(data.id);
    } else if (data.esp_id) {
      response = await this.fileRepository.findByEspId(data.esp_id);
    } else {
      response = null;
    }
    return response ? right(response) : left(new Error("Error on get file"));
  }
}
