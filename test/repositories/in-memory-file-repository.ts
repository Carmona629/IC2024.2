import { FileRepository } from "../../src/domain/repository/file";
import { File } from "../../src/domain/entity/file";

export class InMemoryFileRepository implements FileRepository{
    public file: File[] = [];

    save(file: File): Promise<File> {
        this.file.push(file);
        return Promise.resolve(file);
    }
        
    find(): Promise<File[]> {
        return Promise.resolve(this.file);
    }

    findById(id: string): Promise<File | null> {
        return Promise.resolve(this.file.find(f => f.id === id) ?? null);
    }

    delete(file: File): Promise<void> {
        const index = this.file.findIndex(f => f.id === file.id);
        if (index!== -1) {
            this.file.splice(index, 1);
        }
        return Promise.resolve();
    }

    findByEspId(esp_id: string): Promise<File[]> {
        return Promise.resolve(this.file.filter(f => f.esp_id === esp_id));
    }
    
    findByEspIdAndName(esp_id: string, name: string): Promise<File[]> {
        return Promise.resolve(this.file.filter(f => f.esp_id === esp_id && f.name === name));
    }
}