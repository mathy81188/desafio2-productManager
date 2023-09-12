const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(info);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(obj, title, description, price, thumbnail, code, stock) {
    try {
      const product = await this.getProducts();
      const checkItems =
        title && description && price && code && thumbnail && stock;
      if (!checkItems) {
        console.log("Producto agregado");
      } else {
        console.log("Este producto ya existe");
        return;
      }

      let id;
      if (!product.length) {
        id = 1;
      } else {
        id = product[product.length - 1].id + 1;
      }

      product.push({ id, ...obj });
      await fs.promises.writeFile(this.path, JSON.stringify(product));
    } catch (error) {
      return error;
    }
  }

  async getProductById(idProd) {
    try {
      const prods = await this.getProducts();
      const prod = prods.find((p) => p.id === idProd);
      if (prod) {
        return prod;
      } else {
        return " Not Found";
      }
    } catch (error) {
      return Error;
    }
  }
  async updateProduct(idProd, obj) {
    try {
      const prods = await this.getProducts();
      const modifProd = prods.findIndex((p) => p.id === idProd);
      if (modifProd === -1) {
        return -1;
      }
      const prod = prods[modifProd];
      prods[modifProd] = { ...prod, ...obj };
      await fs.promises.writeFile(this.path, JSON.stringify(prods));
      return 1;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(idProd) {
    try {
      const prods = await this.getProducts();
      const deletedProd = prods.find((p) => p.id === idProd);
      if (!deletedProd) {
        return -1;
      }
      const product = prods.filter((p) => p.id !== idProd);

      await fs.promises.writeFile(this.path, JSON.stringify(product));
      return 1;
    } catch (error) {
      return error;
    }
  }
}

const product1 = {
  title: "Titanic",
  description: "null",
  price: 1000,
  thumbnail: "https://titanic",
  code: "1997",
  stock: "10",
};
const product2 = {
  title: "Terminator 2",
  description: "null",
  price: 1000,
  thumbnail: "https://terminator2",
  code: "1991",
  stock: "5",
};
const product3 = {
  title: "Rocky",
  description: "null",
  price: 1000,
  thumbnail: "https://rocky",
  code: "1978",
  stock: "10",
};
const product4 = {
  title: "Batman",
  description: "",
  price: 2000,
  thumbnail: "https://batman",
  code: "1992",
  stock: "15",
};

const product5 = {
  title: "Volver al futuro",
  description: "null",
  price: 2000,
  thumbnail: "https://backtothefuture",
  code: "1988",
  stock: "15",
};
async function test() {
  const manager = new ProductManager("products.json");

  await manager.addProduct(product5);
  // const prods = await manager.getProducts();
  //  console.log(prods);
}
test();
