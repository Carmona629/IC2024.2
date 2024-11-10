import { PrismaClient } from "@prisma/client";
import { Esp } from "../../entity/esp";
import { EspRepository } from "../esp";

export class PrismaEspRepository implements EspRepository {
  prisma = new PrismaClient();
  async create(esp: Esp): Promise<Esp> {
    const response = await this.prisma.esp.create({
      data: {
        id: esp.id,
        name: esp.name,
        location: esp.location,
        createdAt: esp.createdAt,
      },
    });
    return Esp.create(
      {
        name: response.name,
        location: response.location,
      },
      response.id
    );
  }

  async update(esp: Esp): Promise<Esp> {
    const response = await this.prisma.esp.update({
      where: {
        id: esp.id,
      },
      data: {
        name: esp.name,
        location: esp.location,
      },
    });
    return Esp.create(
      {
        name: response.name,
        location: response.location,
      },
      response.id
    );
  }
  async find(): Promise<Esp[]> {
    const response = await this.prisma.esp.findMany();
    return response.map((esp) =>
      Esp.create(
        {
          name: esp.name,
          location: esp.location,
        },
        esp.id
      )
    );
  }
  async findById(id: string): Promise<Esp | null> {
    const response = await this.prisma.esp.findUnique({
      where: {
        id,
      },
    });
    if (!response) return null;
    return Esp.create(
      {
        name: response.name,
        location: response.location,
      },
      response.id
    );
  }
  async findByName(name: string): Promise<Esp | null> {
    const response = await this.prisma.esp.findUnique({
      where: {
        name,
      },
    });
    if (!response) return null;
    return Esp.create(
      {
        name: response.name,
        location: response.location,
      },
      response.id
    );
  }
  async delete(esp: Esp): Promise<void> {
    await this.prisma.esp.delete({
      where: {
        id: esp.id,
      },
    });
  }
}
