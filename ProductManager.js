import { promises as fs } from "fs";

class MisProductos  {
  constructor(path) {
    this.path = path;
  }
 async addProduct(object) {
    const MiCode = this.Productos.map((p) => p.code);
    const Revision = MiCode.includes(object.code);
    if (Revision) {
      console.log("Este codigo ya figura en la base de datos, por favor verifique");
    } else if (Object.values(object).includes("")) {
      console.log( "Complete los campos, no pueden estar vacio");
    } 
    else 
    {
      let id;
      id = this.Productos.length + 1;
      const NuevoProducto = { ...object, id };
      this.Productos.push(NuevoProducto);
      return console.log(` Se agrego a la base un nuevo porducto      : ${NuevoProducto.id} `);
    }
  }


  async getProducts() {
    try {
      const NuevoValor = await fs.readFile(this.path, "utf8");
      return JSON.parse(NuevoValor);
    } catch (error) {
      throw error;
    }
  }

  async getPorductById(id) {
    try {
      const NuevoValor = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(NuevoValor);
      const product = data.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Not Found");
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const NuevoValor = await fs.readFile(this.path, "utf-8");
      const InfoJs = JSON.parse(NuevoValor);
      const BorrarItem = JSON.stringify(
        InfoJs.find((product) => product.id === id)
      );
      const nuevaINfo = InfoJs.filter((product) => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(nuevaINfo), "utf-8");
      return console.log(
        `El producto ${BorrarItem} se elimino`
      );
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(id, entry, value) {
    try {
      const NuevoValor = await fs.readFile(this.path, "utf-8");
      const InfoJs = JSON.parse(NuevoValor);
      const index = InfoJs.findIndex((product) => product.id === id);
      if(!InfoJs[index][entry]){
        throw Error
      }
      InfoJs[index][entry] = value;
      await fs.writeFile(this.path, JSON.stringify(InfoJs, null, 2));
      return console.log(InfoJs); 
    } catch (error) {
      console.log('Not found');
    }
  }
}
const products = new MisProductos ("./data.json");

