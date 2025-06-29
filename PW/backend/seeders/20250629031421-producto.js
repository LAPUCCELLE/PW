'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Productos', [
      {
        nombre: "Camisa de satín",
        precio: 79.95,
        categoria: "mujer",
        color: "Azul",
        talla: ["XS","S","M","L","XL"],
        tipo: "camisas",
        stock: 20,
        imagenMain: "https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185976%2FCamisa-de-satin---Negro---H-M-PE.jpg%3Fv%3D638803660463500000",
        imagen1: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185974%2FCamisa-de-satin---Negro---H-M-PE.jpg%3Fv%3D638803660445800000",
        imagen2: "https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185975%2FCamisa-de-satin---Negro---H-M-PE.jpg%3Fv%3D638803660458800000" ,
        imagen3: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185977%2FCamisa-de-satin---Negro---H-M-PE.jpg%3Fv%3D638803660476800000" ,
        descripcion: "Camisa ligeramente larga en tejido fluido de satín. Modelo de manga larga con hombros ligeramente caídos, cuello, botones de metal adelante y puños anchos abotonados. Bajo redondeado.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Jean con strass",
        precio: 89.95,
        categoria: "mujer",
        color: "Azul denim",
        talla: ["34","36","39","40","42"],
        tipo: "pantalones",
        stock: 10,
        imagenMain: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5151859%2FJean-con-strass---Azul-denim---H-M-PE.jpg%3Fv%3D638803459993970000",
        imagen1: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5151855%2FJean-con-strass---Azul-denim---H-M-PE.jpg%3Fv%3D638803459951930000",
        imagen2: "https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5151856%2FJean-con-strass---Azul-denim---H-M-PE.jpg%3Fv%3D638803459964900000",
        imagen3: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5151857%2FJean-con-strass---Azul-denim---H-M-PE.jpg%3Fv%3D638803459975830000",
        descripcion: "Jean de cinco bolsillos en denim de algodón con strass brillante. Modelo de talle alto con pierna recta y cierre con botón.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Top off-the-shoulder con cuentas",
        precio: 89.95,
        categoria: "mujer",
        color: "Gris oscuro jaspeado",
        talla: ["XS","S","M","L","XL"],
        tipo: "casacas",
        stock: 30,
        imagenMain:"https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185352%2FTop-off-the-shoulder-con-cuentas---Gris-oscuro-jaspeado---H-M-PE.jpg%3Fv%3D638803656518100000",
        imagen1:"https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185348%2FTop-off-the-shoulder-con-cuentas---Gris-oscuro-jaspeado---H-M-PE.jpg%3Fv%3D638803656472870000",
        imagen2:"https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185349%2FTop-off-the-shoulder-con-cuentas---Gris-oscuro-jaspeado---H-M-PE.jpg%3Fv%3D638803656484100000",
        imagen3:"https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185350%2FTop-off-the-shoulder-con-cuentas---Gris-oscuro-jaspeado---H-M-PE.jpg%3Fv%3D638803656493300000",
        descripcion: "Top corto en punto acanalado con hombros descubiertos y cuentas decorativas en el escote. Modelo ajustado con mangas largas ceñidas.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Cardigan con detalles decorativos",
        precio: 109,
        categoria: "mujer",
        color: "Negro",
        talla: ["XS","S","M","L","XL"],
        tipo: "casacas",
        stock: 5,
        imagenMain: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5212541%2FCardigan-con-detalles-decorativos---Gris-oscuro-jaspeado---H-M-PE.jpg%3Fv%3D638804580101830000",
        imagen1:"https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5354788%2FChompa-con-detalles-decorativos---Negro---H-M-PE.jpg%3Fv%3D638832910090270000",
        imagen2:"https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5354789%2FChompa-con-detalles-decorativos---Negro---H-M-PE.jpg%3Fv%3D638832910103500000",
        imagen3:"",
        descripcion: "Cardigan tejido en punto fino suave con detalles decorativos. Modelo con cuello redondo ribeteado, botonadura frontal y puños y bajo acanalado.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Zapatos de vestir destalonados con puntera fina",
        precio: 109,
        categoria: "mujer",
        color: "Plateado",
        talla: ["36","37","38","39","40","41"],
        tipo: "zapatos",
        stock: 20,
        imagenMain: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5229719%2FZapatos-de-vestir-destalonados-con-puntera-fina---Plateado---H-M-PE.jpg%3Fv%3D638809334762930000",
        imagen1:"https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5229717%2FZapatos-de-vestir-destalonados-con-puntera-fina---Plateado---H-M-PE.jpg%3Fv%3D638809334733970000",
        imagen2:"https://hmperu.vtexassets.com/unsafe/768x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5229718%2FZapatos-de-vestir-destalonados-con-puntera-fina---Plateado---H-M-PE.jpg%3Fv%3D638809334748200000",
        imagen3:"https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5229720%2FZapatos-de-vestir-destalonados-con-puntera-fina---Plateado---H-M-PE.jpg%3Fv%3D638809334770000000",
        descripcion: "Zapatos de vestir en tejido revestido con puntera fina y tira delgada ajustable en el talón con hebilla de metal. Taco delgado revestido 7 cm.",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
