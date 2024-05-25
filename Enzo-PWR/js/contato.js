
var checkbox = document.getElementById("subscribe");

function enviarContato() {

    let tempDB = [];
    try {
        tempDB = JSON.parse(localStorage.getItem("db"));
    } catch (e) {
        console.log(`Error: ${e}`);
    }

    let msg = "";
    const nomePessoa = document.getElementById("nome-pessoa");
    msg += `Nome: ${nomePessoa.value}\n`;

    const dataNacimento = document.getElementById("data");
    msg += `data de nascimento: ${dataNacimento.value}\n`;

    const telefonePessoa = document.getElementById("telefone");
    msg += `telefone: ${telefonePessoa.value}\n`;

    const emailPessoa = document.getElementById("email");
    msg += `E-mail: ${emailPessoa.value}\n`;

    const escolaridade = document.getElementById("escola");
    const option = escolaridade.children[escolaridade.selectedIndex];
    const index = escolaridade.selectedIndex;
    const text = option.textContent;
    msg += `Escolariedade: ${text}\n`;

    const generoMasculino = document.getElementById("masculino");
    const generoFeminino = document.getElementById("feminino");

    let genero = "M"
    if (generoMasculino.checked) {
        msg += `Genero: ${genero}\n`;

    } else if (generoFeminino.checked) {
        genero = "F"
        msg += `Genero: ${genero}\n`;
    }

    const mensagemEnviar = document.getElementById("mensagem");
    msg += `Mensagem: ${mensagemEnviar.value}\n`;

    // alert(msg)
    alert("Dados enviados com sucesso!");

    const payload = {
        nome: nomePessoa.value,
        data_nascimento: dataNacimento.value,
        telefone: telefonePessoa.value,
        email: emailPessoa.value,
        escolaridade: index,
        genero: genero,
        mensagem: mensagemEnviar.value,
    }

    if (tempDB === null){
        tempDB = [];
    }
    
    tempDB.push(payload);

    localStorage.setItem("db", JSON.stringify(tempDB));

}

function subscribeMember(){

    let subscribeDB = [];
    try {
        subscribeDB = JSON.parse(localStorage.getItem("subscribe"));
    } catch (e) {
    }

    const email = document.getElementById("email");
    if (email === null || email.value === "") {
        alert("Preencha todos os campos para e-mail");
        checkbox.checked = false;
        return;
    }
    const nome = document.getElementById("nome-pessoa");
    if (nome === null || nome.value === "") {
        alert("Preencha todos os campos para o nome")
        checkbox.checked = false;
        return;
    }


    const payload = {
        email: email.value,
        nome: nome.value,
    }
    if (subscribeDB === null) {
        subscribeDB = [];
    }

    let found = false;
    subscribeDB.forEach(element => {
      
        if (found) {
            return;
        }

        if (element.email === email.value && !found) {
            alert("Email já existente na base");
            found = true;
            checkbox.checked = false;
        }
    });

    subscribeDB.push(payload);
    localStorage.setItem("subscribe", JSON.stringify(subscribeDB));
}

checkbox.addEventListener('change', function() {
    if (this.checked) {
        subscribeMember();
    }
});
