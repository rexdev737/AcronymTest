import request from 'supertest';
import App from '@/app';
import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { Acronym } from '@interfaces/acronyms.interface';
import getData from '@models/acronyms.model';
import AcronymsRoute from '@routes/acronyms.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Acronyms', () => {
  describe('[GET] /acronyms', () => {
    it('response statusCode 200 / findAll', () => {
      const from = 1;
      const limit = 10;
      const search = 'ZZZZ';
      const searchAcronyms: Acronym[] = getData().acronyms.filter((acronym: Acronym) => {
        return acronym.name === search ? acronym : null;
      });
      const acronyms: Acronym[] = searchAcronyms.slice(from - 1, from + limit - 1);
      const acronymsRoute = new AcronymsRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer())
        .get(`${acronymsRoute.path}?from=${from}&limit=${limit}&search=${search}`)
        .expect(200, { data: acronyms, message: 'findAll' });
    });
  });

  describe('[POST] /acronyms', () => {
    it('response statusCode 201 / created', async () => {
      const acronymData: CreateAcronymDto = {
        name: 'KIU',
        description: 'Kim Il Ung',
      };
      const acronymsRoute = new AcronymsRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer()).post(`${acronymsRoute.path}`).send(acronymData).expect(201);
    });
  });

  describe('[PUT] /acronyms/:name', () => {
    it('response statusCode 200 / updated', async () => {
      const name = 'ZZZZ';
      const acronymData: CreateAcronymDto = {
        name: 'KIU',
        description: 'Kim Il Ung',
      };
      const acronymsRoute = new AcronymsRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer()).put(`${acronymsRoute.path}/${name}`).send(acronymData).expect(200);
    });
  });

  describe('[DELETE] /acronyms/:name', () => {
    it('response statusCode 200 / deleted', () => {
      const name = 'ZZZZ';
      const deleteAcronym: Acronym[] = getData().acronyms.filter(acronym => acronym.name !== name);
      const acronymsRoute = new AcronymsRoute();
      const app = new App([acronymsRoute]);

      return request(app.getServer()).delete(`${acronymsRoute.path}/${name}`).expect(200, { data: deleteAcronym, message: 'deleted' });
    });
  });
});
