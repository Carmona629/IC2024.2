import { beforeEach, describe, expect, it } from "vitest"
import { ExistsEsp } from './exists-esp';
import { InMemoryEspRepository } from '../../../../test/repositories/in-memory-esp-repository';
import { Esp } from "../../entity/esp";

describe("ExistEsp", () => {
    let existEsp: ExistsEsp
    let espRepository: InMemoryEspRepository

    beforeEach(() => {
        espRepository = new InMemoryEspRepository();
        existEsp = new ExistsEsp(espRepository);
    });


    it('should return true if exists esp in repository', async () => {
        const esp = Esp.create({
            name: 'Test',
            location: 'Test Location'
        })
        await espRepository.create(esp)
        const response = await espRepository.findByName('Test');
        expect(response).not.toBeNull();
        expect(response?.name).toBe('Test');
        expect(response?.location).toBe('Test Location');
    })

    it('should return false if not exists ESP in repository', async () => {
        const foundEsp = await espRepository.findByName('Test');
        expect(foundEsp).toBeNull();
      });
})
