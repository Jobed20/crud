getProducts();

window.editProducts = editProducts;
window.createProducts = createProducts;
window.deleteProducts = deleteProducts;
window.updateProducts = updateProducts;

//Insert in HTML=======================================================================================

let editingID = null;

function printProducts(products) {
    // Identificar el contenedor
    const container = document.getElementById('product-container');
    // Generar el HTML
    let html = '';
    for(let i = 0; i < products.length; i++) {
        html += `<div class="col-md-6 col-lg-4 mt-3">
                    <div class="card">
                        <div class="card-body">
                            <img class="card-img-top" src=${products[i].image}>
                            <h5 class="card-title">${products[i].name}</h5>
                            <p class="card-text">${products[i].price}</p>
                            <div class="text-end">
                                <button class="btn btn-danger" onclick="deleteProducts(${products[i].id})">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editProducts(${products[i].id})">
                                    <i class="fas fa-pen"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`
            }
    // Imprimir el HTML
    container.innerHTML = html;

}


//get products===================================================================================
function getProducts() {
    axios.get('https://e-commerce-api-academlo.herokuapp.com/api/products', )
        .then(function (response) {
            const products = response.data;
            printProducts(products);
        })
        .catch(function (error) {
            console.log(error);
        })
}

//create products===================================================================================



function createProducts() {
    const addName = document.getElementById('name').value;
    const addPrice = document.getElementById('price').value;
    const addImage = document.getElementById('image').value;

    const newProduct = {
        name: addName,
        price: addPrice,
        image: addImage,
    }

    axios.post('https://e-commerce-api-academlo.herokuapp.com/api/products', newProduct, )
        .then(function (response) {
            console.log(response);
            alert('Se ha agregado el producto');
            getProducts()
        })
        .catch(function (error) {
            alert('no se pudo agregar el producto');
            console.log(error);
        })
}

//delete products===================================================================================


function deleteProducts(id) {
    const confirmation = confirm('¿Estás seguro de que desea eliminar el producto?');
    if(!confirmation){
        return
    }
    axios.delete(`https://e-commerce-api-academlo.herokuapp.com/api/products/${id}`, )
        .then(() => {
            alert('Se ha eliminado el producto');
            getProducts();
        })
        .catch((error) => {
            alert('No se pudo eliminar el producto');
            console.log(error)
        })
}

//edit products===================================================================================

function editProducts(id) {
    getId = id
    axios.get(`https://e-commerce-api-academlo.herokuapp.com/api/products/${id}`, )
        .then( (response) => {
            const product =  response.data;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('image').value = product.image;
            document.getElementById('id').value = product.id;

        })
        .catch((error) => {
            alert('No se pudo cargar el producto');
            console.log(error)
        })

    return id;
}

//update products===================================================================================

function updateProducts() {

    const id = document.getElementById('id').value;

    const addName = document.getElementById('name').value;
    const addPrice = document.getElementById('price').value;
    const addImage = document.getElementById('image').value;

    const ProductEdited = {
        name: addName,
        price: addPrice,
        image: addImage,
    }

    axios.put(`https://e-commerce-api-academlo.herokuapp.com/api/products/${id}`, ProductEdited,)
        .then(function (response) {
            alert('Se editó el producto correctamente');
            
            getProducts();
        })
        .catch(function (error) {
            alert('No se pudo editar el producto');
            console.log(error)
        })
}
        


