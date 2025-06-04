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
            choice2 : document.querySelector('.chat__choicestext--2')
        }
        const update = (suivant) =>{
            gamestate.index = suivant;
            change();
        };
        const change = () => {
            const clone = youranswer.cloneNode(true);
            clone.innerText = gamestate.current.choix1.text;
            clone.classList.add('chat__bubble')
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
