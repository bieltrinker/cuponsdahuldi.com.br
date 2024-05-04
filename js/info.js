document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const paginaRef = urlParams.get('paginaRef');

    if (paginaRef) {
        // Use o campo "paginaRef" do produto para carregar e exibir apenas o produto correspondente
        loadProduct(paginaRef);
    } else {
        // Se nenhum "paginaRef" for fornecido na URL, pode exibir uma mensagem de erro ou redirecionar para uma página de erro
        document.getElementById('productDetails').innerText = "Referência do produto não encontrada.";
    }
});

function loadProduct(paginaRef) {
    // Fazer uma requisição fetch para obter os detalhes do produto com a "paginaRef" especificada
    fetch('db_produtos/products.json')
        .then(response => response.json())
        .then(products => {
            // Encontrar o produto com a "paginaRef" correspondente
            const product = products.find(product => product.paginaRef === paginaRef);
            if (product) {
                // Exibir os detalhes do produto na página
                const productDetailsDiv = document.getElementById('productDetails');
                productDetailsDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="content">
                        <h2>${product.name}</h2>
                        <p><strong>A partir de:</strong> <span class="valorPreco">${product.price}</span></p>
                        <p><strong>Categoria:</strong> ${product.categoria}</p>
                        <button id="buyButton" onclick="buyProduct('${product.link}')"><span class="mdi mdi-sale"></span>Pegar Promoção</button>
                    </div>
                `;
            } else {
                // Se nenhum produto for encontrado com a "paginaRef" especificada, exibir uma mensagem de erro
                const productDetailsDiv = document.getElementById('productDetails');
                productDetailsDiv.innerText = "Produto não encontrado.";
            }
        })
        .catch(error => {
            // Se ocorrer um erro ao carregar os dados do JSON, exibir uma mensagem de erro
            const productDetailsDiv = document.getElementById('productDetails');
            productDetailsDiv.innerText = "Erro ao carregar os detalhes do produto.";
            console.error('Erro ao carregar os detalhes do produto:', error);
        });
}

function buyProduct(link) {
    // Redirecionar para o link de compra
    window.open(link, "_blank");
}