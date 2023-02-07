
import { promises as fs } from "fs";
class Producto {
  constructor(titulo, descripcion, precio, img, code, stock) {
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.precio = precio;
      this.img = img;
      this.code = code;
      this.stock = stock;
  }
}

class ProductManager  {
  constructor(path) {
    this.path = path;
  }
  async addProduct(ProdNuevo) {
    try {
      const read = await fs.readFile(this.path, "utf8");
      const data = JSON.parse(read);
      const objCode = data.map((product) => product.code);
      const BuscoCodigo = objCode.includes(ProdNuevo.code);
      if (BuscoCodigo) {
        console.log("Codigo de producto existente, intente otro");
      } else if (Object.values(ProdNuevo).includes("")) {
        console.log("Complete los campos, no pueden estar vacio" );
      } 
      else {
        let id;
        data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1)
        const NuevoArr = { ...ProdNuevo, id };
        data.push(NuevoArr);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
        return console.log(`Se agrego a la base un nuevo porducto con id: ${NuevoArr.id} `  );
      }
    } catch (error) {
      throw error;
    }
  }
 
  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf8");
      return JSON.parse(read);
    } catch (error) {
      throw error;
    }
  }
 
  
  async getById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
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
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const Deletear = JSON.stringify(
        data.find((product) => product.id === id)
      );
      const NuevoArr = data.filter((product) => product.id !== id);
      await fs.writeFile(this.path, JSON.stringify(NuevoArr), "utf-8");
      return console.log(`El producto ${Deletear} ha sido eliminado  `);
    } catch (error) {
      throw error;
    }
  }
 

  async updateProduct(id, entry, value) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const index = data.findIndex((product) => product.id === id);
      if(!data[index][entry]){
        throw Error
      }
      data[index][entry] = value;
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
      return console.log(data); 
    } catch (error) {
      console.log('Not found');
    }
  }

}


const Prod = new Producto("David", "Bareiro", 120, "www.ole.com.ar", "150", 10);
const productManager = new ProductManager("./data.json");

const Probando = async()=>{
  await productManager.addProduct(Prod)
    
  console.log(await productManager.getProducts());
  // console.log(await productManager.getById(2));
  // console.log(await productManager.updateProduct(2, "precio", 210))
  //  console.log(await productManager.getById(1))
  // console.log(await productManager.deleteProduct(1));

}
Probando();

export default ProductManager;

