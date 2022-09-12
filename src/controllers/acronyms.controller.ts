import { NextFunction, Request, Response } from 'express';
import { CreateAcronymDto } from '@dtos/acronyms.dto';
import { Acronym } from '@interfaces/acronyms.interface';
import AcronymService from '@services/acronyms.service';

class AcronymsController {
  public acronymService = new AcronymService();

  public getAcronyms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let { from, limit, search } = req.query;

      if (!from) from = '0';
      if (!limit) limit = '10';
      if (!search) search = '';

      const findAllAcronymsData: Acronym[] = await this.acronymService.findAllAcronym(
        parseInt(from.toString(), 10),
        parseInt(limit.toString(), 10),
        search.toString(),
      );

      res.status(200).json({ data: findAllAcronymsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronymData: CreateAcronymDto = req.body;
      const createAcronymData: Acronym = await this.acronymService.createAcronym(acronymData);

      res.status(201).json({ data: createAcronymData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const name = String(req.params.name);
      const acronymData: CreateAcronymDto = req.body;
      const updateAcronymData: Acronym[] = await this.acronymService.updateAcronym(name, acronymData);

      res.status(200).json({ data: updateAcronymData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const name = String(req.params.name);
      const deleteAcronymData: Acronym[] = await this.acronymService.deleteAcronym(name);

      res.status(200).json({ data: deleteAcronymData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AcronymsController;
