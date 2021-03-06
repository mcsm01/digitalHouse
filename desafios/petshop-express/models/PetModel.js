const pets = [{
	nome: "Batman",
	tipo: "cão",
	raca: "labrador",
	idade: 5,
	genero: "M",
	vacinado: false,
	servicos: ["banho", "tosa"]
},
{
	nome: "Costelinha",
	tipo: "cão",
	raca: "vira-lata",
	idade: 10,
	genero: "M",
	vacinado: true,
	servicos: ["banho"]
},
{
	nome: "Scooby Doo",
	tipo: "cão",
	raca: "Dogue Alemão",
	idade: 51,
	genero: "M",
	vacinado: false,
	servicos: ["banho", "tosa"]
},
{
	nome: "Tom",
	tipo: "gato",
	raca: "poodle",
	idade: 5,
	genero: "M",
	vacinado: false,
	servicos: ["corte de unha"]
},
{
	nome: "Ada",
	tipo: "iguana",
	raca: "albina",
	idade: 5,
	genero: "F",
	vacinado: true,
	servicos: ["banho"]
}];

const listarPets = () => {
	let conteudo = "";
	for (let pet of pets) {
    conteudo += `
    <p>------------------------</p>
    <p>Nome: ${pet.nome}</p>
    <p>Tipo: ${pet.tipo}</p>
    <p>Raça: ${pet.raca}</p>
    <p>Idade: ${pet.idade} anos</p>
    <p>Genero: ${pet.genero == "F" ? "Fêmea" : "Macho"}</p>
    <p>Vacinado: ${pet.vacinado ? "Sim" : "Não"}</p>
    <p>Serviços: ${pet.servicos.length == 0 ? "Nenhum" : pet.servicos}</p>`;
  }
  return conteudo;
};

const buscarPetPorNome = nomePet => pets.filter(pet => pet.nome === nomePet);

const validarDados = novoPet => {
  return (
    novoPet.nome &&
    novoPet.idade &&
    novoPet.tipo &&
    novoPet.raca &&
    novoPet.genero
  );
};

const adicionarPet = novoPet => {
  if (typeof novoPet == "object" && validarDados(novoPet)) {

    novoPet.nome = String(novoPet.nome);
    novoPet.idade = parseInt(novoPet.idade);

    if (!novoPet.servicos) {
      novoPet.servicos = [];
    }

		pets.push(novoPet);
		return `${novoPet.nome} adicionadx com sucesso!`
  } else {
    return false;
  }
};

const vacinarPet = nomePet => {
	const pet = buscarPetPorNome(nomePet);
	if (!pet.vacinado) {
		pet.vacinado = true;
		return `${pet.nome} foi vacinado com sucesso!`;
	} else {
		return `Ops, ${pet.nome} já está vacinado!`;
	}
};

const contarVacinados = () => {
	const vacinados = pets.filter(pet => pet.vacinado).length;
	const naoVacinados = pets.filter(pet => !pet.vacinado).length;

	return `
	<p>------------------------</p>
	<p>Temos ${vacinados} pets vacinados.</p>
	<p>Temos ${naoVacinados} pets NÃO vacinados.</p>
	<p>------------------------</p>
	`;
};

const campanhaVacina = () => {
	let petVacinadosCampanha = 0;
	for (let pet of pets) {
		vacinarPet(pet);
		petVacinadosCampanha++;
	}
	return `${petVacinadosCampanha} pets foram vacinados nessa campanha!`;
};

const darBanhoPet = nomePet => {
	const pet = buscarPetPorNome(nomePet).pop();
  pet.servicos.push("banho");
  return `${nomePet} está de banho tomado!`;
};

const tosarPet = nomePet => {
	const pet = buscarPetPorNome(nomePet).pop();
  pet.servicos.push("tosa");
  return `${nomePet} está com cabelinho na régua :)`;
};

const apararUnhasPet = nomePet => {
	const pet = buscarPetPorNome(nomePet).pop();
  pet.servicos.push("corte de unhas");
	return `${nomePet} está de unhas aparadas!`;
};


const atenderPet = (nomePet, ...servicosSolicitados) => {
	
	const servicosCadastrados = [darBanhoPet, tosarPet, apararUnhasPet];

	let conteudo = "";

	servicosSolicitados.forEach(cadaServico => {
		servicosCadastrados.forEach(servico => {
			if (cadaServico.trim() == servico.name) {
				conteudo += servico(nomePet) + "\n";
			}
		});
	})
	
  const pagar = () => {
    return "Pagamento realizado com sucesso!";
  };

  return `${conteudo}${pagar()}\nVolte sempre, ${nomePet}`;
};
  
module.exports = { 
	listarPets, 
	adicionarPet, 
	buscarPetPorNome, 
	campanhaVacina, 
	contarVacinados,
	atenderPet
};