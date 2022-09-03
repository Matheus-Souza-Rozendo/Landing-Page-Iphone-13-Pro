let input_element = document.querySelectorAll("input");
const erroNome = document.getElementById("erro-nome");
const erroSobrenome = document.getElementById("erro-sobrenome");
const erroIdade = document.getElementById("erro-idade");
const erroEmail = document.getElementById("erro-email");
const form=document.getElementById("contact-form");
const email=document.getElementById("email");
const nome=document.getElementById("nome");
const sobrenome=document.getElementById("sobrenome");
const idade=document.getElementById("idade");
let erros_element = [erroNome,erroSobrenome,erroEmail,erroIdade];
let valido;

//pattern="[a-zA-Z\u00C0-\u00FF]"


for(let i=0;i<input_element.length;i++){
input_element[i].addEventListener("keyup", () => {
    input_element[i].setAttribute("value", input_element[i].value);
})
}


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    validarCampo(nome,erroNome,"- Digite apenas Letras");
    validarCampo(sobrenome,erroSobrenome,"- Digite apenas Letras");
    validarCampo(email,erroEmail,"");
    validarCampo(idade,erroIdade,"");
    validaIdade();
    if(valido){
        console.log("valido");
        form.submit();
    }
});

function validarCampo(obj,lugar,msg){
    if(!obj.validity.valid){
        showErro(obj,lugar,msg);
        valido=false;
    }
}

function showErro(obj,p,formato){
    if(obj.validity.valueMissing){
        setErromsg(p,"Campo Obrigatório");
    }else{
        if(obj.validity.typeMismatch){
            setErromsg(p,"Formato inválido"+formato);
        }else{
            if(obj.validity.tooShort){
                setErromsg(p,`O campo deve conter no mínimo ${obj.minLength} caracteres; você digitou apenas ${obj.value.length}`);
            }else{
                if(obj.validity.tooLong){
                    setErromsg(p,`O campo deve conter no maximo ${obj.maxLength} caracteres; você digitou ${obj.value.length}`);
                }
            }
        }
    }
}


function setErromsg(p,msg){
    p.textContent=msg;
    p.setAttribute("class","erro");
}



for(let i=0;i<input_element.length;i++){
    input_element[i].addEventListener("input", (event) => {
        valido=true;
        if(erros_element[i].classList.contains("erro")){
            erros_element[i].removeAttribute("class");
            erros_element[i].textContent="";
        }
    })
}

function validaIdade(){
    var valor = parseInt(idade.value);
    if((valor<=0) || (valor>=121)){
        setErromsg(erroIdade,"Digite valores entre 1 e 120");
        valido=false;
    }
    if(isNaN(parseInt(idade.value)) && (!idade.validity.valueMissing)){
        setErromsg(erroIdade,"Digite apenas números");
        valido=false;
    }


}