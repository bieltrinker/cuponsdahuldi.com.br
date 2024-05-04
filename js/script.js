
window.addEventListener('scroll', function() {
    var navmenu = document.getElementById('navmenu');
    var triangleTop = document.querySelector('.triangleTop');
    var windowHeight = window.innerHeight;
    var navmenuHeight = navmenu.offsetHeight;
    var triangleTopHeight = triangleTop.offsetHeight;
    var navmenuTop = (windowHeight - navmenuHeight - triangleTopHeight) / 2;
    var offset = window.pageYOffset || document.documentElement.scrollTop;

    if (offset > navmenuTop) {
        navmenu.classList.add('sticky');
        triangleTop.style.display = 'block'; // Se quiser mostrar o triângulo quando o menu estiver fixo
    } else {
        navmenu.classList.remove('sticky');
        triangleTop.style.display = 'none'; // Se quiser esconder o triângulo quando o menu não estiver fixo
    }
});

// Função para calcular a diferença de tempo em horas
function calculateTimeDifference(addedTime) {
    var currentTime = new Date();
    // Separando a data e a hora
    var dateTimeParts = addedTime.split("T");
    // Separando a data em dia, mês e ano
    var dateParts = dateTimeParts[0].split("/");
    // Separando a hora em horas, minutos e segundos
    var timeParts = dateTimeParts[1].split(":");
    // Criando um objeto Date com os componentes separados
    var addedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
    // Calculando a diferença de tempo em milissegundos
    var timeDifferenceInMilliseconds = currentTime - addedDate;
    // Convertendo a diferença de tempo para horas
    var timeDifferenceInHours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));

    // Verificando se a diferença é maior que 24 horas
    if (timeDifferenceInHours >= 24) {
        // Calculando a diferença em dias
        var timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
        // Verificando se é apenas um dia
        if (timeDifferenceInDays === 1) {
            return "Ontem";
        } else {
            return "Há " + timeDifferenceInDays + " dias";
        }
    } else {
        return "Há cerca de " + timeDifferenceInHours + " horas";
    }
}

// Função para gerar os cards de produtos
function generateProductCards(products, categoryFilter = null) {
    var container = document.getElementById("productContainer");
    container.innerHTML = ""; // Limpa o conteúdo existente

    products.forEach(function(product) {
        // Verifica se o produto corresponde à categoria filtrada, se houver filtro
        if (categoryFilter && categoryFilter !== "all" && product.categoria !== categoryFilter) {
            return; // Ignora este produto se não corresponder à categoria filtrada
        }

        var card = document.createElement("div");
        card.className = "card";
        var timeDifference = calculateTimeDifference(product.addedTime);
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="content">
                <h2>${product.name}</h2>
                <p><strong>A partir de:</strong> <span class="valorPreco">${product.price}</span></p>
                <p><strong>Categoria:</strong> ${product.categoria}</p>
                <button><span class="mdi mdi-sale"></span> Pegar Promoção</button>
                <p class="time"><span class="mdi mdi-clock"></span> ${timeDifference} </p>
            </div>
        `;

        // Adicionando link afiliado ao botão
        var button = card.querySelector("button");
        button.addEventListener("click", function(event) {
            event.stopPropagation();
            window.open(product.link, "_blank");
        });

        // Adicionando link para a página do produto ao card
        card.addEventListener("click", function() {
            window.location.href = `info.html?paginaRef=${product.paginaRef}`;
        });

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Carrega os produtos inicialmente
    loadProducts(function(data) {
        generateProductCards(data);
    });

    // Adiciona eventos de clique aos links de categoria
    var categoryLinks = document.querySelectorAll(".category-filter");
    categoryLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var category = link.getAttribute("data-category");
            loadProducts(function(data) {
                generateProductCards(data, category);
            });
        });
    });
});

// Função para carregar os dados dos produtos do arquivo JSON
function loadProducts(callback) {
    fetch('db_produtos/products.json')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Erro ao carregar os dados dos produtos:', error));
}

// Chama a função para carregar os dados do arquivo JSON e gerar os cards de produtos quando a página carrega
window.onload = function() {
    loadProducts(function(products) {
        generateProductCards(products);
    });
};

var carouselImages = [
    "images/banner_1.png",
    "images/banner_2.png",
    "images/banner_1.png",
];

var carouselLinks = [
    "https://chat.whatsapp.com/F4WWn3FeMMPJ4UYbr1gVTj",
    "https://google.com",
    "https://youtube.com",
];

var currentImageIndex = 0;
var carouselImageElement = document.getElementById("carousel-image");
var carouselLinkElement = document.getElementById("carousel-link");

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    carouselImageElement.src = carouselImages[currentImageIndex];
    carouselLinkElement.href = carouselLinks[currentImageIndex];
}

setInterval(changeImage, 3000); // Alterna a imagem a cada 3 segundos (3000 milissegundos)
