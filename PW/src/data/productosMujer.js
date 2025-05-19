const productosMujer = [
    {
        id: "PROD-1001",
        nombre: "Camisa de satín",
        precio: 79.95,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5186008%2FCamisa-de-satin---Azul-marino---H-M-PE.jpg%3Fv%3D638803660656230000",
        descripcion: "Camisa ligeramente larga en tejido fluido de satín. Modelo de manga larga con hombros ligeramente caídos, cuello, botones de metal adelante y puños anchos abotonados. Bajo redondeado."
    },
    
    {
        id: "PROD-1002",
        nombre: "Jean con strass",
        precio: 89.95,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5151859%2FJean-con-strass---Azul-denim---H-M-PE.jpg%3Fv%3D638803459993970000",
        descripcion: "Camisa Jean de cinco bolsillos en denim de algodón con strass brillante. Modelo de talle alto con pierna recta y cierre con botón.ligeramente larga en tejido fluido de satín. Modelo de manga larga con hombros ligeramente caídos, cuello, botones de metal adelante y puños anchos abotonados. Bajo redondeado."
    },

    {
        id: "PROD-1003",
        nombre: "Top off-the-shoulder con cuentas",
        precio: 89.95,
        categoria: "mujer",
        imagen:"https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5185352%2FTop-off-the-shoulder-con-cuentas---Gris-oscuro-jaspeado---H-M-PE.jpg%3Fv%3D638803656518100000",
        descripcion: "Top corto en punto acanalado con hombros descubiertos y cuentas decorativas en el escote. Modelo ajustado con mangas largas ceñidas."
    },

    {
        id: "PROD-1004",
        nombre: "Cardigan con detalles decorativos",
        precio: 109,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5212541%2FCardigan-con-detalles-decorativos---Gris-oscuro-jaspeado---H-M-PE.jpg%3Fv%3D638804580101830000",
        descripcion: "Cardigan tejido en punto fino suave con detalles decorativos. Modelo con cuello redondo ribeteado, botonadura frontal y puños y bajo acanalado."
    },

    
    {
        id: "PROD-1005",
        nombre: "Zapatos de vestir destalonados con puntera fina",
        precio: 109,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5229719%2FZapatos-de-vestir-destalonados-con-puntera-fina---Plateado---H-M-PE.jpg%3Fv%3D638809334762930000",
        descripcion: "Zapatos de vestir en tejido revestido con puntera fina y tira delgada ajustable en el talón con hebilla de metal. Taco delgado revestido 7 cm."
    },

    {
        id: "PROD-1006",
        nombre: "Leggings revestidos",
        precio: 74.95,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5153971%2FLeggings-revestidos---Marron-oscuro---H-M-PE.jpg%3Fv%3D638803471675200000",
        descripcion: "Leggings en tejido revestido con elástico oculto en la cintura. Pliegue cosido adelante y cierre oculto en los bajos."
    },

    {
        id: "PROD-1007",
        nombre: "Pantalon de Twill con pierna barril",
        precio: 74.95,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5208872%2FPantalon-de-twill-con-pierna-barril---Beige-oscuro---H-M-PE.jpg%3Fv%3D638804558289570000",
        descripcion: "Pantalón de cinco bolsillos en twill de algodón. Modelo de corte holgado con cierre, botón y piernas curvas maxivolumen."
    },

    {
        id: "PROD-1008",
        nombre: "Camisa oversize de twill",
        precio: 89.95,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5201270%2FCamisa-oversize-de-twill---Beige-Cuadros---H-M-PE.jpg%3Fv%3D638804512621800000",
        descripcion: "Camisa oversize de twill con acabado cepillado suave. Modelo de manga larga con hombros marcadamente caídos, cuello clásico, botonadura frontal y bolsillos superiores con solapa y botón. Puños abotonados y canesú con pliegues de caja invertidos en la espalda. Bajo redondeado."
    },

    {
        id: "PROD-1009",
        nombre: "Polo de punto",
        precio: 39.95,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5207579%2FPolo-de-punto---Negro-Escarchado---H-M-PE.jpg%3Fv%3D638804550602770000",
        descripcion: "Polo de manga larga en punto elástico. Modelo ajustado con cuello redondo. Con forro parcial."
    },

    {
        id: "PROD-1010",
        nombre: "Blazer oversize de punto",
        precio: 249,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5210576%2FBlazer-oversize-de-punto---Negro---H-M-PE.jpg%3Fv%3D638804568388800000",
        descripcion: "Blazer cruzado corto de punto con solapas de pico y botones revestidos en satín. Modelo oversize con hombreras y bolsillo superior insertado. Con forro."
    },

    {
        id: "PROD-1011",
        nombre: "Body drapeado con ribete de encaje",
        precio: 179,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5249657%2FBody-drapeado-con-ribete-de-encaje---Negro---H-M-PE.jpg%3Fv%3D638815613323400000",
        descripcion: "Body en punto elástico suave con escote en V, frente drapeado cruzado con ribete inferior de encaje y mangas globo largas con puños elásticos. Botones a presión ocultos en la entrepierna y cobertura parcial en la parte trasera."
    },

    {
        id: "PROD-1012",
        nombre: "Vestido en tejido jacquard con bajo burbuja",
        precio: 129,
        categoria: "mujer",
        imagen: "https://hmperu.vtexassets.com/unsafe/1440x0/center/middle/https%3A%2F%2Fhmperu.vtexassets.com%2Farquivos%2Fids%2F5187768%2FVestido-en-tejido-jacquard-con-bajo-burbuja---Negro---H-M-PE.jpg%3Fv%3D638803671187930000",
        descripcion: "Vestido corto sin mangas en tejido jacquard. Modelo con escote en V pronunciado y bajo burbuja que aporta un toque divertido al diseño. Forro de punto."
    },

]

export default productosMujer;