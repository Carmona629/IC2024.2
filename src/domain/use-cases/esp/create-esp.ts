import { Either, left, right } from "../../../core/either";
import { Esp } from "../../entity/esp";
import { EspRepository } from "../../repository/esp";

export interface CreateEspDTO {
  name: string;
  location: string;
}

type CreateEspResponse = Promise<Either<Error, Esp>>;

export class CreateEsp {
  constructor(private readonly espRepository: EspRepository) {}

  async execute(data: CreateEspDTO): CreateEspResponse {
    const esp = Esp.create({
      name: data.name,
      location: data.location,
    });
    const response = await this.espRepository.create(esp);
    return response ? right(response) : left(new Error("Error on save esp"));
  }
}
