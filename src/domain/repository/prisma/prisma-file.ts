import { File } from "../../entity/file";
import { FileRepository } from "../file";
import { PrismaClient } from "@prisma/client";

export class PrismaFileRepository implements FileRepository {
  prisma = new PrismaClient();
  async save(file: File): Promise<File> {
    const response = await this.prisma.files.create({
      data: {
        id: file.id,
        name: file.name,
        url: file.url,
        espId: file.esp_id,
        createdAt: file.createdAt,
      },
    });
    return File.create(
      {
        name: response.name,
        url: response.url,
        esp_id: response.espId,
      },
      response.id
    );
  }
  async find(): Promise<File[]> {
    const response = await this.prisma.files.findMany();
    return response.map((file) =>
      File.create(
        {
          name: file.name,
          url: file.url,
          esp_id: file.espId,
        },
        file.id
      )
    );
  }
  async findById(id: string): Promise<File | null> {
    const response = await this.prisma.files.findUnique({
      where: {
        id,
      },
    });
    if (!response) return null;
    return File.create(
      {
        name: response.name,
        url: response.url,
        esp_id: response.espId,
      },
      response.id
    );
  }
  async delete(file: File): Promise<void> {
    await this.prisma.files.delete({
      where: {
        id: file.id,
      },
    });
  }
  async findByEspId(esp_id: string): Promise<File[]> {
    const response = await this.prisma.files.findMany({
      where: {
        espId: esp_id,
      },
    });
    return response.map((file) =>
      File.create(
        {
          name: file.name,
          url: file.url,
          esp_id: file.espId,
        },
        file.id
      )
    );
  }
}
