import { CreateEsp } from "./create-esp";
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryEspRepository } from "../../../../test/repositories/in-memory-esp-repository";

describe("Test CreateEsp use case", () => {
    let createEsp: CreateEsp;
    let espRepository: InMemoryEspRepository;
    
    beforeEach(() => {
        espRepository = new InMemoryEspRepository();
        createEsp = new CreateEsp(espRepository);
    });
    
    it("should create a new ESP", async () => {
        const esp = {
            name: "Test",
            location: "Test Location"
        }
        const response = await createEsp.execute(esp);
        expect ((response.isRight)).toBeTruthy();
        // expect(espRepository.update.length).toBe(1);
        // expect(response.value.name).toBe("Test");
        expect(espRepository.esp[0].name).toBe(esp.name)
        expect(espRepository.esp[0].location).toBe(esp.location)
    });
    it("should create a new ESP with a same name", async () => {
        const esp2 = {
            name: "Test",
            location: "Test Location"
        }
        const response = await createEsp.execute(esp2);
        expect((response.isRight)).toBeTruthy();
        // expect(espRepository.update.length).toBe(1);
        // expect(response.value.name).toBe("Test");
        expect(espRepository.esp[0].name).toBe(esp2.name)
        expect(espRepository.esp[0].location).toBe(esp2.location)
    });
})
