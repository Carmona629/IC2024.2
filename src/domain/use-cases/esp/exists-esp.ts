import { Either, left, right } from "../../../core/either";
import { Esp } from "../../entity/esp";
import { EspRepository } from "../../repository/esp";

interface ExistsEspDTO {
  name: string;
}

type ExistsEspResponse = Promise<Either<false, Esp>>;

export class ExistsEsp {
  constructor(private readonly espRepository: EspRepository) {}

  async execute(data: ExistsEspDTO): ExistsEspResponse {
    const response = await this.espRepository.findByName(data.name);
    return response ? right(response) : left(false)
  }
}
