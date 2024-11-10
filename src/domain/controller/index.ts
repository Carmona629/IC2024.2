import { Esp } from "../entity/esp";
import { PrismaEspRepository } from "../repository/prisma/prisma-esp";
import { PrismaFileRepository } from "../repository/prisma/prisma-file";
import { CreateEsp } from "../use-cases/esp/create-esp";
import { ExistsEsp } from "../use-cases/esp/exists-esp";
import { CreateFile } from "../use-cases/file/create-file";
import { GetFile } from "../use-cases/file/get-file";
import { z } from "zod";

export class Controller {
  private espRepository = new PrismaEspRepository();
  private fileRepository = new PrismaFileRepository();
  private createEspUseCase = new CreateEsp(this.espRepository);
  private existsEspUseCase = new ExistsEsp(this.espRepository);
  private createFileUseCase = new CreateFile(this.fileRepository);
  private getFileUseCase = new GetFile(this.fileRepository);

  async postFile(data: {
    esp_name: string;
    location?: string;
    file_name: string;
    file_hex: string;
  }) {
    const exists = await this.existsEspUseCase.execute({
      name: data.esp_name,
    });
    const esp = exists.isRight()
      ? exists.value
      : data.location
      ? (
          await this.createEspUseCase.execute({
            name: data.esp_name,
            location: data.location,
          })
        ).value
      : (() => {
          new Error("Error on create esp");
        })();
    if (typeof esp === typeof Error) {
      throw esp;
    } else if (esp instanceof Esp) {
      const url = data.file_hex;
      const response = await this.createFileUseCase.execute({
        esp_id: esp.id,
        name: data.file_name,
        url,
      });
      return response.value;
    }
  }

  async getFile(data: { id?: string; esp_id?: string }) {
    if (data.id) {
      return (await this.getFileUseCase.execute({ id: data.id })).value;
    } else if (data.esp_id) {
      return (await this.getFileUseCase.execute({ esp_id: data.esp_id })).value;
    }
    return [];
  }
}

// return await this.createEspUseCase.execute(data);
