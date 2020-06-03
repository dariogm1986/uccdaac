import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Put } from '@nestjs/common';

import { CreateProvinciaDTO } from './dto/provincia.dto';
import { ProvinciaService } from './provincia.service';

@Controller('provincia')
export class ProvinciaController {

    constructor(private provinciaService: ProvinciaService) { }

    @Post('/create')
    async provinciaCreate(@Res() res, @Body() createProvinciaDTO: CreateProvinciaDTO) {
        const now = new Date();        
        createProvinciaDTO.created_at = now;
        createProvinciaDTO.updated_at = now;
        const provincia = await this.provinciaService.createProvincia(createProvinciaDTO);
            return res.status(HttpStatus.OK).json({
                message: 'Provincia criada com sucesso',
                provincia
            });
        
    }

    @Get('/')
    async getProvincias(@Res() res) {
        const provincias = await this.provinciaService.getProvincias();
        return res.status(HttpStatus.OK).json({
            provincias
        });
    }
    @Get('/:provinciaID')
    async getProvincia(@Res() res, @Param('provinciaID') provinciaID: string) {
        const provincia = await this.provinciaService.getProvincia(provinciaID);
        if (!provincia) {
            throw new NotFoundException('Esta Provincia não existe');
        }
        return res.status(HttpStatus.OK).json({
            provincia
        });
    }
    
    @Delete('/delete/:provinciaID')
    async deleteProvincia(@Res() res, @Param('provinciaID') provinciaID: string) {
        const provincia = await this.provinciaService.deleteProvincia(provinciaID);
        if (!provincia) {
            throw new NotFoundException('Esta Provincia não existe');
        }
        return res.status(HttpStatus.OK).json({
            provincia
        });
    }
    @Put('/update/:provinciaID')
    async updateProvincia(@Res() res, @Param('provinciaID') provinciaID: string, @Body() updateProvinciaDTO: CreateProvinciaDTO) {
        const now = new Date();        
        updateProvinciaDTO.updated_at = now;
        const provincia = await this.provinciaService.updateProvincia(provinciaID, updateProvinciaDTO);
        if (!provincia) {
            throw new NotFoundException('Esta Provincia não existe');
        }
        return res.status(HttpStatus.OK).json({
            provincia
        });
    }



}
