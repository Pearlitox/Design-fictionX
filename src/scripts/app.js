const context = [
    "Certaines intelligences artificielles sont conçues pour donner l'impression de parler à des personnages fictifs. Elles sont si bien faites qu'on pourrait avoir l'impression de parler avec une vraie personne.",
    "Beaucoup de personnes se laissent absorber par l'utilisation de ces IA et finissent même par remplacer leurs relations humaines.",
    "Mais à quoi ressembleraient ces IA si elles étaient conçues pour éviter l'addiction ?",
    "Bonne expérience :)"
]
const popup = document.querySelector('.popup')
const chara = document.querySelector('.character')
const chat = document.querySelector('.chat')
const menu = document.querySelector('.menu')
const contexttext = document.querySelector('.popup__text');
contexttext.innerText = context[0];
let index = 0
const next = document.querySelector('.popup__btn');
next.addEventListener('click', function(){
    index++
    contexttext.innerText = context[index];
    if(index < context.length ){
        next.innerText = "Suivant";
    }else if(index === context.length - 1){
        next.innerText = "Commencer";
    }else{
       popup.classList.add('hidden');
       chara.classList.remove('blurr');
       chat.classList.remove('blurr');
       menu.classList.remove('blurr');
    }

})
const burgermenu = document.querySelector('.burgermenu');
const character = document.querySelector('.character');
burgermenu.addEventListener('click', function(){
    character.classList.toggle('characteractive');
})
fetch("./assets/data/data.json")
    .then((response) => {
        return response.json();

    })
    .then((data) => {
        console.log(data)
        const conversation = document.querySelector('.chat__scrollable');
        const youranswer = document.querySelector('.chat__you');
        const youranswertext = document.querySelector('.chat__bubble');
        const gamestate = {
            index: 0,
            data: data,
            get current(){
                return this.data[this.index]
            }
        }
        const ui = {
            bubble1 : document.querySelector('.chat__choices--1'),
            bubble2 : document.querySelector('.chat__choices--2'),
            choice1 : document.querySelector('.chat__choicestext--1'),
            choice2 : document.querySelector('.chat__choicestext--2'),
            fin1: document.querySelector('.fin1'),
            fin2: document.querySelector('.badending')
        }
        const update = (suivant) =>{
            gamestate.index = Number(suivant);
            change();
        };
        const change = () => {
            const clone = youranswer.cloneNode(true);
    
            clone.classList.add('chat__bubble')
            clone.classList.add('chat__you')
            let answer = document.createElement('p');
            let suggestion = document.createElement('p');
            answer.innerText = gamestate.current.texte;
            suggestion.innerText = gamestate.current.suggestions;
            answer.classList.add('paragraph__IA');
            suggestion.classList.add('suggestion__IA');
            setTimeout(() =>{
                conversation.appendChild(answer);
                conversation.appendChild(suggestion)
                
            },1000); 
            if(gamestate.index === 12){
                ui.fin1.classList.remove('hidden');
                chara.classList.add('blurr');
                chat.classList.add('blurr');
                menu.classList.add('blurr');
            }else if(gamestate.index === 13){
                ui.fin2.classList.remove('hidden');
                chara.classList.add('blurr');
                chat.classList.add('blurr');
                menu.classList.add('blurr');
            }
            console.log(gamestate.index)
            ui.choice1.innerText = gamestate.current.choix1.text;
            ui.choice2.innerText = gamestate.current.choix2.text;
 
        }
        ui.bubble1.addEventListener('click', (function(event){
            const clone = youranswer.cloneNode(true);
            if(event.target){
                clone.innerText = gamestate.current.choix1.text;
                clone.classList.add('chat__bubble');
                conversation.appendChild(clone);
                update(gamestate.current.choix1.suivant);
            }


        }))
        ui.bubble2.addEventListener('click', (function(event){
            const clone = youranswer.cloneNode(true);
            if(event.target){

                clone.innerText = gamestate.current.choix2.text;
                clone.classList.add('chat__bubble');
                conversation.appendChild(clone);
                update(gamestate.current.choix2.suivant);
            }
        }))


        change();
    })
