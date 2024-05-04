document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var productName = document.getElementById("productName").value;
    var productLink = document.getElementById("productLink").value;
    var productCategory = document.getElementById("productCategory").value;
    var productImage = document.getElementById("productImage").value;
    var productPrice = document.getElementById("productPrice").value;

    var newProduct = {
        "name": productName,
        "link": productLink,
        "categoria": productCategory,
        "image": productImage,
        "price": productPrice,
        "addedTime": new Date().toISOString()
    };

    fetch('db_produtos/products.json')
        .then(response => response.json())
        .then(data => {
            // Adicionando o novo produto aos dados existentes
            data.push(newProduct);
            // Convertendo de volta para JSON
            var newData = JSON.stringify(data);
            // Enviando os dados atualizados de volta para o arquivo JSON
            return fetch('db_produtos/products.json', {
                method: 'PUT', // Usamos PUT para atualizar o arquivo
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newData
            });
        })
        .then(() => {
            console.log("Produto adicionado com sucesso!");
            alert("Produto adicionado com sucesso!");
            // Limpar o formulário após adicionar o produto
            document.getElementById("productForm").reset();
        })
        .catch(error => console.error('Erro ao adicionar o produto:', error));
});

import { writeFile } from 'fs';

const dados = [
  {"codigo": "", "nome": ""}
];

const jsonContent = JSON.stringify(dados, null, 2);

const arquivo = 'db_produtos/produtos.json';

writeFile(arquivo, jsonContent, 'utf8', (err) => {
  if (err) {
    console.error('Ocorreu um erro ao gravar o arquivo JSON:', err);
    return;
  }
  console.log('O arquivo JSON foi criado e gravado com sucesso.');
});