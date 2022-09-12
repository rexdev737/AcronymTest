import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { HttpException } from '@exceptions/HttpException';
import { Acronym } from '@interfaces/acronyms.interface';
import getData from '@models/acronyms.model';
import { isEmpty } from '@utils/util';

class AcronymService {
  public acronymsData = getData().acronyms;

  public async findAllAcronym(from: number, limit: number, search: string): Promise<Acronym[]> {
    const searchAcronyms: Acronym[] = this.acronymsData.filter((acronym: Acronym) => {
      return acronym.name === search ? acronym : null;
    });
    const acronyms: Acronym[] = searchAcronyms.slice(from - 1, from + limit - 1);

    return acronyms;
  }

  public async createAcronym(acronymData: CreateAcronymDto): Promise<Acronym> {
    if (isEmpty(acronymData)) throw new HttpException(400, 'acronymData is empty');

    const findAcronym: Acronym = this.acronymsData.find(acronym => acronym.name === acronymData.name);
    if (findAcronym) throw new HttpException(409, `This acronym ${acronymData.name} already exists`);

    const createAcronymData: Acronym = { ...acronymData };
    this.acronymsData = [...this.acronymsData, createAcronymData];

    return createAcronymData;
  }

  public async updateAcronym(name: string, acronymData: CreateAcronymDto): Promise<Acronym[]> {
    if (isEmpty(acronymData)) throw new HttpException(400, 'acronymData is empty');

    const findAcronym: Acronym = this.acronymsData.find(acronym => acronym.name === name);

    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    const updateAcronymData: Acronym[] = this.acronymsData.map((acronym: Acronym) => {
      if (acronym.name === findAcronym.name) acronym = { ...acronymData };
      return acronym;
    });

    return updateAcronymData;
  }

  public async deleteAcronym(name: string): Promise<Acronym[]> {
    const findAcronym: Acronym = this.acronymsData.find(acronym => acronym.name === name);
    if (!findAcronym) throw new HttpException(409, "Acronym doesn't exist");

    const deleteAcronymData: Acronym[] = this.acronymsData.filter(acronym => acronym.name !== findAcronym.name);
    return deleteAcronymData;
  }
}

export default AcronymService;
