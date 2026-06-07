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
                loadElements(datos);

            }
        },
        error: function (jhrx, estado, errorA) {
            console.log(estado);
        },
    });
}

function loadElements(jsonData) {
    pedidos(jsonData.pedidos);
    exportador(jsonData.exportador);
}

function pedidos(jsonPedidos) {
    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'list-group-flush');

    const parentElement = document.getElementById('list-data');
    parentElement.innerHTML = '';

    // Crear un objeto para acceso rápido a los nombres de los exportadores
    const exportadoresMap = {};
    jsonmain.exportador.forEach(exp => {
        exportadoresMap[exp.id] = exp.nombre;
    });

    for (let i = 0; i < jsonPedidos.length; i++) {
        const elementData = jsonPedidos[i];

        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-light', 'rounded-3');

        // Obtener el nombre del exportador usando el ID
        const nombreExportador = exportadoresMap[elementData.id_exp] || 'Desconocido';

        listItem.innerHTML = `
            ${nombreExportador} ${elementData.fecha}
            <button class="float-end btn btn-warning rounded-pill">Previsualizar</button>
        `;

        listGroup.appendChild(listItem);
    }

    parentElement.appendChild(listGroup);
}

function separateDate(dateString) {
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) {
        throw new Error('Invalid date format');
    }

    // Devolver la fecha en el formato 'YYYY-MM-DD' sin cambios
    return dateString;
}

function pedidos_filtro(jsonPedidos, fecha, exp) {
    try {
        fecha = fecha ? separateDate(fecha) : ''; // Verificar y convertir la fecha al formato correcto solo si fecha no es vacío
    } catch (error) {
        console.error(error);
        return;
    }

    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'list-group-flush');

    const parentElement = document.getElementById('list-data');
    parentElement.innerHTML = '';

    // Crear un objeto para acceso rápido a los nombres de los exportadores
    const exportadoresMap = {};
    jsonmain.exportador.forEach(exp => {
        exportadoresMap[exp.id] = exp.nombre;
    });

    let found = false; // Indicador para verificar si se encuentra algún pedido

    for (let i = 0; i < jsonPedidos.length; i++) {
        const elementData = jsonPedidos[i];

        // Convertir exp a cadena para comparación
        const expStr = exp.toString();
        const idExpStr = elementData.id_exp.toString();

        // Verificar si la fecha y el exportador coinciden con los parámetros proporcionados
        if ((fecha === '' || elementData.fecha === fecha) && (exp === 'Todos' || idExpStr === expStr)) {
            found = true; // Se encontró al menos un pedido
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-light', 'rounded-3');

            // Obtener el nombre del exportador usando el ID
            const nombreExportador = exportadoresMap[elementData.id_exp] || 'Desconocido';

            listItem.innerHTML = `
                ${nombreExportador} ${elementData.fecha}
                <button class="float-end btn btn-warning rounded-pill">Previsualizar</button>
            `;

            listGroup.appendChild(listItem);
        }
    }

    if (found) {
        parentElement.appendChild(listGroup);
    } else {
        const noPedidosMessage = document.createElement('p');
        noPedidosMessage.classList.add('fs-5', 'text-center', 'my-3');
        noPedidosMessage.textContent = 'No hay ningún pedido';
        parentElement.appendChild(noPedidosMessage);
    }
}

function exportador(jsonexportador) {
    const selectElement = document.getElementById('exp');
    selectElement.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.text = 'Todos';
    defaultOption.value = 'Todos'; // Asegurarse de que el valor sea 'Todos'
    defaultOption.selected = true;
    selectElement.appendChild(defaultOption);

    for (let i = 0; i < jsonexportador.length; i++) {
        const elementData = jsonexportador[i];

        const optionElement = document.createElement('option');
        optionElement.text = elementData.nombre;
        optionElement.value = elementData.id;
        selectElement.appendChild(optionElement);
    }
}

const dateInput = document.getElementById('date-input');
const expInput = document.getElementById('exp');

dateInput.addEventListener('change', function () {
    const selectedDate = dateInput.value;
    const selectedExp = expInput.value;
    console.log('Selected date:', selectedDate);
    pedidos_filtro(jsonmain.pedidos, selectedDate, selectedExp);
});

expInput.addEventListener('change', function () {
    const selectedDate = dateInput.value;
    const selectedExp = expInput.value;
    console.log('Selected exp:', selectedExp);
    pedidos_filtro(jsonmain.pedidos, selectedDate, selectedExp);
});
