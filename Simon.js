let game_sequence = [] ; 
let user_sequence = [] ; 

let started  = false ; 
let level = 0 ; 
let highestscore = 0 ; 
let gameStart = true ;

// Selector's : 
let head2 = document.querySelector("h2") ;
let btns = document.querySelectorAll(".box") ;
let box = document.querySelector(".box-container") ; 
let btnPlay = document.querySelector(".btn-play") ;
let highest_score_board = document.createElement("p") ; 
highest_score_board.innerHTML =  `<b>Your Highest Score :</b>` ;
let score_str = highest_score_board.innerText ; 



//for Anywhere can Take i/p ; 
btnPlay.addEventListener("click",function(){
    setTimeout(()=>{
        if(started == false){
            console.log("started") ; 
            started = true ; 
            gameStart  = true ; 
            console.log(started) ;
            LevelUp() ; 
        }
    },400) ;
    btnPlay.classList.add("btnHide") ;
   
}); 

//  flash button and level up : 


function flashBtn(btn){
    btn.classList.add("white") ; 

    setTimeout(()=>{
    btn.classList.remove("white") ; 
    },250) ;
}

function LevelUp(){
    user_sequence = [] ; 
    level++ ; 
    head2.innerText = `Level ${level}` ;

    // Random Button :

    // console.log(btn) 2; 


    let Random_button_idx = Math.floor(Math.random()*4) ; 
    let selected_btn = btns[Random_button_idx] ;

    // console.log(btn[Random_button_idx]) ;


    // Game - Sequence : 
    game_sequence.push(selected_btn) ; 

    flashBtn(selected_btn) ;

}


// User-Clicked : 

function userFlash(){
    let userClickBtn = this ; 

    if( gameStart == false){
        return ; 
    }

    // user - sequence : 
    user_sequence.push(userClickBtn) ; 

    userClickBtn.classList.add("userFlash") ; 

    setTimeout(()=>{
        userClickBtn.classList.remove("userFlash") ; 
    },250) ;

    CheckBtns(user_sequence.length) ;
}


for( btn of btns ){
    btn.addEventListener("click",userFlash);
    
}


// CHECKING THE SEQUENCE : 
function CheckBtns(idx){

    if(game_sequence[idx - 1] == user_sequence[idx - 1]){
           if(game_sequence.length == user_sequence.length){
                     setTimeout(LevelUp,1000) ;
           }
    }
    else{
        let curr_score = game_sequence.length - 1 ;
        head2.innerHTML = `Game Over ! Your Score : ${curr_score}<br>${HighestScore(curr_score).innerText}<br>Press Play To Restart The Game ` ; 
        setTimeout(gameReset,500) ;
        gameOver() ; 
    }

}


function HighestScore(curr_score){

    if(highestscore < curr_score ){ 
        highestscore  = curr_score ; 
        highest_score_board.innerHTML =  `<b>${score_str}   ${highestscore}</b>` ;
    }

    return highest_score_board ; 
   
}

function gameOver(){
    box.classList.add("gameOver") ; 

    setTimeout(()=>{
        box.classList.remove("gameOver") ; 
    },100) ;

    setTimeout(() => {
        btnPlay.classList.remove("btnHide") ;
    },100);
}


function gameReset(){
    level = 0 ;  
    user_sequence = game_sequence = [] ; 
    started = false ;
    gameStart = false ; 
}
