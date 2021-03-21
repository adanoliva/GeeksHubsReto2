total =0; //Variable donde almacenaremos el total de la cesta de la compra

lista = []; //Lista que llevará el control de lo que hay dentro de la cesta de la compra

//la función de mover el objecto, para almacenar los datos como son el id (nombre) y el precio del producto
function mover(ev, price)
{
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("price", price);
    document.getElementById("producto").innerText = "Producto: " + ev.target.id;
    document.getElementById("precio").innerText = "Precio : " + price + "€";
}


//Función para detener  la opción por defecto al pasar un objeto por encima
function allowDrop(ev) 
{
    ev.preventDefault();
}

//Función para soltar un elemento, en la variable cesta guardamos si es en cesta o no, para
//añadir el elemento a la cesta o eliminarlo
function drop(ev, cesta)
{
    //Si el ID del contenedor no corresponde con la cesta o la estanteria del super, 
    //no hacemos nada, de esta forma controlamos que no se añada un producto encima de otros
    if (ev.target.id == "cesta" || ev.target.id == "super")
    {
        //Cancelamos el evento por defecto
        ev.preventDefault();

        //Recogemos los datos del elemento que se está transfiriendo, guardado al mover.
        var data = ev.dataTransfer.getData("id");
        var price = parseInt(ev.dataTransfer.getData("price"));

        //Antes de volver a insertar eliminamos el producto de la lista
        eliminar(data);

        //Si estamos en un evento de añadir a la cesta
        if (cesta)
        {
            //Sumamos el precio total y añadimos el elemento a la lista
            total += price;
            lista.push({"name": data, "price": price});
        }

        //Por último, actualizamos el precio mostrado en pantalla
        document.getElementById("total").innerText = total;
        //Y añadimos el elemento (producto) al contenedor que corresponda
        ev.target.appendChild(document.getElementById(data));
    }

}

function soltar()
{
    document.getElementById("producto").innerText = "Arrastre un producto para ver su precio.";
    document.getElementById("precio").innerText = " Suelte elementos en la zona de la cesta para comprarlos o en la zona del supermercado para devolverlos.";
}

function eliminar(name)
{
    //Generamos una lista auxiliar
    let listaAux = []

    //Recorremos la lista
    lista.forEach(item => {
        //Guardamos en la lista auxiliar los datos de los que no coinciden
        if (item["name"] != name)
        {
            listaAux.push({"name": item["name"], "price": item["price"]});
        }
        else
        {
            //En el caso de que el nombre coincida, eliminamos el precio del total
            total -= item["price"];
        }
    });

    //Asignamos la lista auxiliar a la lista, para poder seguir trabajando con ella
    lista = listaAux;
}

window.onload = function() {
    soltar();
  };