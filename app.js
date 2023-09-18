 

const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer ;
let gameGrid;
let winningPosition =[ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]
//  function to initialise 

function initGame(){
    currentPlayer="X"

 
    //  ui ko bhi empty karna padega 

    boxes.forEach((box, index)=>{

    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //  green ko remove karna padega --> fir se initialise kar dete hai hum style ko 
   box.classList = ` box box${index+1}` ;

    });

    gameGrid=["","","","","","","","",""]
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = ` Current Player  -  ${currentPlayer}`;


}
initGame();



function swapTurn(){

    if(currentPlayer ==="X"){

        currentPlayer ="0"
    }
    else {

        currentPlayer ="X"
    }

    // UI UPDATE 

    gameInfo.innerText= ` Current Player - ${currentPlayer}`
}



function checkGameOver (){

    let answer = "" ;
    winningPosition.forEach((position)=>{
        if( (gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="" ) 
       &&  (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

        //   cheak who is winner 
     if(gameGrid[position[0]]==="X"){

        answer ="X"

     }
     else{

        answer = "0"  
     }

    //   disable pointer event( matlab ye aab click hi nahi ho paega )
    // mouse action rukwa diya with the help of  pointer event --> none
    boxes.forEach((box)=>{ 
       box.style.pointerEvents ="none";
    })

    //   now we need to change color 

         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");

        }

    
    })

    if(answer!==""){

        gameInfo.innerText = `Winner player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //  tie 
    let fillCount = 0;
    gameGrid.forEach((box)=>{

        if(box!==""){

            fillCount++ ;

        }
    })

    if(fillCount===9){

        gameInfo.innerText = ` Game Tied !`
        newGameBtn.classList.add("active"); 
    }
     
}

function handleClick(index){

    if(gameGrid[index] === ""){


        boxes[index].innerText=currentPlayer;
      

    gameGrid[index]= currentPlayer;

//  to turn the turn
    swapTurn();
    //cheack koi jeeta tho nahi 
    checkGameOver()
    }


}

boxes.forEach((box,index)=>{

    box.addEventListener("click",()=>{

        handleClick(index)
    })
});

newGameBtn.addEventListener("click",initGame);






