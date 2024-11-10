import { beforeEach, describe, expect, it } from "vitest"
import { CreateFile } from "./create-file"
import { InMemoryFileRepository } from "../../../../test/repositories/in-memory-file-repository";

describe("Test CreateFile use case", () => {
    let createFile: CreateFile;
    let fileRepository: InMemoryFileRepository;

    beforeEach(() => {
        fileRepository = new InMemoryFileRepository();
        createFile = new CreateFile(fileRepository);
    });

    it("should create a new file", async () => {
        const file = await createFile.execute({
            name: "Test File",
            url: "https://example.com/test.jpg",
            esp_id: "1"
        });
        expect(file.isRight()).toBeTruthy();
        expect(fileRepository.file.length).toBe(1)
        expect(fileRepository.file[0].name).toBe("Test File");
        expect(fileRepository.file[0].url).toBe("https://example.com/test.jpg");
    })
    it("should fail on create a new file", async () => {
        const file = await createFile.execute({
            name: "",
            url: "https://example.com/test.jpg",
            esp_id: "1"
        });
        expect(file.isLeft()).toBeFalsy();
    })

    it("should not create duplicate files", async () =>{

        await createFile.execute({
            name: "Test File",
            url: "https://example.com/test.jpg",
            esp_id: "1"
        });
        const duplicateFile = await createFile.execute({
            name: "Test File",
            url: "https://example.com/test.jpg",
            esp_id: "1"
        });
        expect(duplicateFile.isLeft()).toBeFalsy();
        expect(fileRepository.file.length).toBe(1)
    })
})