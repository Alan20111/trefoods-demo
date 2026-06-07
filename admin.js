
var jsonmain;

loadData();

function loadData() {
    $.ajax({
        url: "http://localhost/planta/index.php/Admin/readData",
        dataType: "json",
        type: "post",
        data: {},
        success: function (datos, estado, jhrx) {
            if (datos.status == 'success') {
                jsonmain = datos;
                console.log(jsonmain);
                loadElements();

            }
        },
        error: function (jhrx, estado, errorA) {
            console.log(estado);
        },
    });
}
function loadElements() {
    ExpLoad();
    ProLoad();
}
function ExpLoad() {
    for (let i = 0; i < jsonmain.exportador.length; i++) {
        // Obtener el nombre del exportador
        const exportadorNombre = jsonmain.exportador[i].nombre;

        // Crear el nuevo elemento li con el nombre del exportador
        var newItem = $(`<li class="list-group-item list-group-item-action list-group-item-light rounded-2">${exportadorNombre}<button class="float-end btn btn-outline-danger me-2 py-0 rounded-pill">Eliminar</button><button class="float-end btn btn-warning me-2 py-0 rounded-pill">Editar</button></li>`);

        // Agregar el nuevo elemento al ul
        $('#list-exp').append(newItem);
    }
}
function ProLoad() {
    for (let i = 0; i < jsonmain.productos.length; i++) {
        // Obtener el nombre del exportador
        const exportadorNombre = jsonmain.productos[i].nombre;

        // Crear el nuevo elemento li con el nombre del exportador
        var newItem = $(`<li class="list-group-item list-group-item-action list-group-item-light rounded-2">${exportadorNombre}<button class="float-end btn btn-outline-danger me-2 py-0 rounded-pill">Eliminar</button><button class="float-end btn btn-warning me-2 py-0 rounded-pill">Editar</button></li>`);
        // Agregar el nuevo elemento al ul
        $('#list-pro').append(newItem);
    }
}
