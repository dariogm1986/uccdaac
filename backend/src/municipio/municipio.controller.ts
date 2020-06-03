import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Put } from '@nestjs/common';

import { CreateMunicipioDTO } from './dto/municipio.dto';
import { MunicipioService } from './municipio.service';

@Controller('municipio')
export class MunicipioController {

    constructor(private municipioService: MunicipioService) { }

    @Post('/create')
    async municipioCreate(@Res() res, @Body() createMunicipioDTO: CreateMunicipioDTO) {
        const now = new Date();        
        createMunicipioDTO.created_at = now;
        createMunicipioDTO.updated_at = now;
        const municipio = await this.municipioService.createMunicipio(createMunicipioDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Municipio criado com sucesso',
            municipio
        });

    }

    @Get('/')
    async getMunicipios(@Res() res) {
        const municipios = await this.municipioService.getMunicipios();
        return res.status(HttpStatus.OK).json({
            municipios
        });
    }

    @Get('/:municipioID')
    async getMunicipio(@Res() res, @Param('municipioID') municipioID: string) {
        const municipio = await this.municipioService.getMunicipio(municipioID);
        if (!municipio) {
            throw new NotFoundException('Este municipio não existe');
        }
        return res.status(HttpStatus.OK).json({
            municipio
        });
    }

    @Delete('/delete/:municipioID')
    async deleteMunicipio(@Res() res, @Param('municipioID') municipioID: string) {
        const municipio = await this.municipioService.deleteMunicipio(municipioID);
        if (!municipio) {
            throw new NotFoundException('Este municipio não existe');
        }
        return res.status(HttpStatus.OK).json({
            municipio
        });
    }
    @Put('/update/:municipioID')
    async updateMunicipio(@Res() res, @Param('municipioID') municipioID: string, @Body() updateMunicipioDTO: CreateMunicipioDTO) {
        const now = new Date();        
        updateMunicipioDTO.updated_at = now;
        const municipio = await this.municipioService.updateMunicipio(municipioID, updateMunicipioDTO);
        if (!municipio) {
            throw new NotFoundException('Este municipio não existe');
        }
        return res.status(HttpStatus.OK).json({
            municipio
        });
    }

}
