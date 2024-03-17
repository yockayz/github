function fetchRepositories() {
    const username = document.getElementById('username').value;

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Sem resposta');
            }
            return response.json();
        })
        .then(data => {
            displayRepositorios(data);
        })
        .catch(error => {
            console.error('Houve um problema com o fetch!', error);
        });
}

function displayRepositorios(repositorios) {
    const repositoriosDiv = document.getElementById('repositorios');
    repositoriosDiv.innerHTML = '';

    if (repositorios.length === 0) {
        repositoriosDiv.textContent = 'Repositório não encontrado.';
        return;
    }

    const ul = document.createElement('ul'); // Cria uma lista não ordenada para os repositórios
    repositorios.forEach(repo => { // Itera sobre os repositórios
        const li = document.createElement('li'); // Cria um item de lista para cada repositório
        
        const link = document.createElement('a'); // Cria um link para o repositório
        link.href = repo.html_url; // Define o URL do link como o URL do repositório no GitHub
        link.textContent = repo.name; // Define o texto do link como o nome do repositório
        li.appendChild(link); // Adiciona o link ao item de lista

        const description = document.createElement('p'); // Cria um parágrafo para exibir a descrição do projeto
        description.textContent = repo.description || "Nenhuma descrição."; // Define o texto do parágrafo como a descrição do projeto, se disponível; caso contrário, exibe "Nenhuma descrição."
        li.appendChild(description); // Adiciona o parágrafo ao item de lista
        
        ul.appendChild(li); // Adiciona o item de lista à lista
    });
    repositoriosDiv.appendChild(ul); // Adiciona a lista de repositórios à div
}
