import { ImageModel } from "./image.model";

export class EmployeeModel {

    id: number = 0;
    name: string;
    prenume: string;
    functie: string;
    salariu: number;
    varsta: Date;
    dataAngajarii: Date;
    telefon: string;
    observatii: string;
    // image: ImageModel;
    // permis : ImageModel;


    constructor(
        name: string, prenume: string,
        functie: string,
        salariu: number,
        varsta: Date,
        dataAngajarii: Date, telefon: string,
        observatii: string,
        // image: ImageModel,
        // permis: ImageModel,
    ) {
        this.name = name;
        this.prenume = prenume;
        this.functie = functie;
        this.salariu = salariu;
        this.varsta = varsta;
        this.dataAngajarii = dataAngajarii;
        this.telefon = telefon;
        this.observatii = observatii;
        // this.image = image;
        // this.permis=permis;
    

    }
}