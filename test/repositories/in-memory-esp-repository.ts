import { EspRepository } from "../../src/domain/repository/esp";
import { Esp } from "../../src/domain/entity/esp";

export class InMemoryEspRepository implements EspRepository{
    public esp: Esp[] = [];
    
    async create(esp: Esp): Promise<Esp> {
        this.esp.push(esp);
        return esp;
    };

    async update(esp: Esp): Promise<Esp> {
        const index = this.esp.findIndex((e: Esp) => e.id === esp.id);
        if (index !== -1) {
            this.esp[index] = esp;
        }
        return esp;
    };

    async find(): Promise<Esp[]> {
        return this.esp;
    };

    async findById(id: string): Promise<Esp | null> {
        return this.esp.find((e: Esp) => e.id === id) ?? null;
    };

    async findByName(name: string): Promise<Esp | null> {
        return this.esp.find((e: Esp) => e.name === name) ?? null;
    };
    
    async delete(esp: Esp): Promise<void> {
        const index = this.esp.findIndex((e: Esp) => e.id === esp.id);
        if (index !== -1) {
            this.esp.splice(index, 1);
        }
    }
}