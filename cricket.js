let batting1_score=0;
let batting2_score=0;
let bowling1_score=0;
let bowling2_score=0;
let firstInnings = "";
let activeTimeouts = [];

const finalmsg=document.querySelectorAll(".msg_container");
const newgame=document.querySelector(".reset");
const changeplayer=document.querySelector(".change_player");
const fpscore=document.querySelector(".msg1");
const fcscore=document.querySelector(".msg2");
const fwinner=document.querySelector(".msg3");

const toss=document.querySelectorAll(".Toss");
const firstline=document.querySelector("#firstline");
const secondline=document.querySelector("#secondline");
const thirdline=document.querySelector(".bat-bowl");
const playerscore=document.querySelector("#player-score");
const composcore=document.querySelector("#computer-score");
const outmsg=document.querySelector("#out-msg");
const tossbtn=document.querySelector("#tos");
const coinChoiceContainer = document.querySelector(".coin_choice");
const head_tail=document.querySelectorAll(".coin_choice button");
const choicebatbal=document.querySelector(".bat_bal");
const bat_bal=document.querySelectorAll(".bat_bal button");
const playbtn=document.querySelector("#play");

const container=document.querySelector(".container");
const restart=document.querySelector(".restart");
const pboxes=document.querySelectorAll(".pbox");
const cboxes=document.querySelectorAll(".cbox");



let player = "";
const declarePlayer= () =>{
    player=prompt("Enter your Name::-");
    player=player.toUpperCase();
    console.log(`player name is ${player}`);
}

declarePlayer();
playerscore.textContent=`${player} score: 0 `;
const tosstime = () => {
    console.log("Toss button was clicked");
    tossbtn.classList.add("hide");
    coinChoiceContainer.classList.remove("hide"); // show container
    console.log("Head and Tail buttons visible");
};

tossbtn.addEventListener('click',tosstime);

const headTail = (event) => {

    let playerChoice =
        event.target.id === "hed"
            ? "Head"
            : "Tail";

    let tossResult =
        Math.random() < 0.5
            ? "Head"
            : "Tail";

    coinChoiceContainer.classList.add("hide");

    if (playerChoice === tossResult) {

        firstline.classList.remove("hide");
        firstline.textContent =
            `Congratulations ${player}, You won the Toss!`;

        secondline.classList.remove("hide");
        secondline.textContent =
            "Choose Bat or Ball";

        choicebatbal.classList.remove("hide");

    } else {

    firstline.classList.remove("hide");
    firstline.textContent =
        `Sorry ${player}, Compo won the Toss!`;

    let compDecision =
        Math.random() < 0.5
            ? "Bat"
            : "Ball";

    // Store from PLAYER'S perspective
    firstInnings =
        compDecision === "Bat"
            ? "Ball"
            : "Bat";

    secondline.classList.remove("hide");
    secondline.textContent =
        `Compo chose to ${compDecision} first`;

    document.querySelector("#batting-player").textContent =
        compDecision === "Bat"
            ? "Compo🤖"
            : player;

    document.querySelector("#bowling-player").textContent =
        compDecision === "Bat"
            ? player
            : "Compo🤖";

    thirdline.classList.remove("hide");
    playbtn.classList.remove("hide");
}
};

head_tail.forEach(btn => {
    btn.addEventListener("click", headTail);
});

const batBall = (event) => {

    let playerChoice =
        event.target.id === "bat"
            ? "Bat"
            : "Ball";

    firstInnings = playerChoice;

    secondline.textContent =
        `You chose to ${playerChoice} first`;

    choicebatbal.classList.add("hide");

    document.querySelector("#batting-player").textContent =
        playerChoice === "Bat"
            ? player
            : "Compo🤖";

    document.querySelector("#bowling-player").textContent =
        playerChoice === "Ball"
            ? player
            : "Compo🤖";

    thirdline.classList.remove("hide");
    playbtn.classList.remove("hide");
};

bat_bal.forEach(btn => {
    btn.addEventListener("click", batBall);
});

const playGame = () => {

    firstline.classList.add("hide");
    secondline.classList.add("hide");
    playbtn.classList.add("hide");

    playerscore.classList.remove("hide");
    composcore.classList.remove("hide");

    container.classList.remove("hide");
    restart.classList.remove("hide");

    pboxes.forEach(box => {

        box.disabled = false;

        box.removeEventListener("click", batting1);
        box.removeEventListener("click", bowling1);
        box.removeEventListener("click", batting2);
        box.removeEventListener("click", bowling2);

        if (firstInnings === "Bat") {
            box.addEventListener("click", batting1);
        } else {
            box.addEventListener("click", bowling1);
        }
    });
};

playbtn.addEventListener("click", playGame);

//box.disabled=false;
const win=()=>{
    container.classList.add('hide');
    finalmsg[0].classList.remove('hide');
    playerscore.classList.add('hide');
    composcore.classList.add('hide');
    thirdline.classList.add('hide');
    outmsg.classList.add('hide');
    restart.classList.add('hide');
}

const batting1=(event) =>{
    const playerRun=parseInt(event.target.textContent);
    const compoRun=Math.floor(Math.random()*6)+1;
    const combox=cboxes[compoRun-1];

    if(playerRun===compoRun)
    {
        event.target.classList.add('out-highlight');
        combox.classList.add("out-highlight");
        setTimeout(()=>{
            event.target.classList.remove('out-highlight');
            combox.classList.remove('out-highlight');
        },500);
    }
    else{
        event.target.classList.add('highlight');
        combox.classList.add("computer-highlight");
        setTimeout(()=>{
            event.target.classList.remove('highlight');
            combox.classList.remove('computer-highlight');
        },500);
    }

    if(playerRun===compoRun)
    {
        pboxes.forEach((box)=>{
            box.disabled=true;
        })
        outmsg.classList.remove("hide");
        outmsg.textContent=`OUT! you scored ${batting1_score} runs! Now Compo will Bat . `;
        console.log("OUT!");
        const timeoutId=setTimeout(()=>{
            outmsg.textContent="Compo will Bat Now.Get ready for Bowling";
            pboxes.forEach((box)=>{
                box.disabled=false;
                box.removeEventListener('click',batting1);
                box.addEventListener('click',bowling2);
                document.querySelector('#batting-player').textContent="Compo";
                document.querySelector('#bowling-player').textContent=player;
            })
        },2000);
        activeTimeouts.push(timeoutId);
    }else{
        batting1_score = batting1_score + playerRun;
        playerscore.textContent=`${player}:${batting1_score}`;
    }
}

const bowling2=(event)=>{
    const playerRun=parseInt(event.target.textContent);
    const compoRun=Math.floor(Math.random()*6)+1;
    const combox=cboxes[compoRun-1];

    if(playerRun===compoRun)
    {
        event.target.classList.add('out-highlight');
        combox.classList.add('out-highlight');
        setTimeout(() => {
            event.target.classList.remove('out-highlight');
            combox.classList.remove('out-highlight');
        },500);
    }
    else{
        event.target.classList.add('computer-highlight');
        combox.classList.add('highlight');
        setTimeout(() => {
            event.target.classList.remove('computer-highlight');
            combox.classList.remove('highlight');
        }, 500);
    }
    if (playerRun===compoRun)
    {
        pboxes.forEach((box) => {
            box.disabled = true;
        });
        outmsg.classList.remove('hide');
        outmsg.textContent = `OUT! Compo scored ${bowling2_score} runs!`;
        const timeoutId=setTimeout(()=>{
            win();
            fpscore.textContent = `Player Score:: ${batting1_score}`;
            fcscore.textContent = `Compo Score:: ${bowling2_score}`;
            fwinner.textContent = "Congratulation! You Win the Game🎉🎉";

        },1000);
        activeTimeouts.push(timeoutId);
    }else{
        bowling2_score = bowling2_score + compoRun;
        composcore.textContent=`Compo🤖 Score: ${bowling2_score}`;
    }

    if (bowling2_score > batting1_score)
    {
        pboxes.forEach((box) => {
            box.disabled = true;
        });
        const timeoutId=setTimeout(()=>{
            win();
            fpscore.textContent=`Player Score:: ${batting1_score}`;
            fcscore.textContent=`Compo Score:: ${bowling2_score}`;
            fwinner.textContent="SORRY! COMPO Win the Game..You Lose😑";
        },1000);
        activeTimeouts.push(timeoutId);
    }
    else if (batting1_score === bowling2_score) {
        // check if all boxes are disabled (innings finished)
        const allDisabled = Array.from(pboxes).every(box => box.disabled);
        if (allDisabled) {
            console.log("It's a tie!");
            const timeoutId = setTimeout(() => {
                win();
                fpscore.textContent = `Player Score: ${batting1_score}`;
                fcscore.textContent = `Computer Score: ${bowling2_score}`;
                fwinner.textContent = "IT'S A TIE!";
            }, 1000);
            activeTimeouts.push(timeoutId);
        }
    }

}

const bowling1=(event)=>{
    const playerRun=parseInt(event.target.textContent);
    const compoRun=Math.floor(Math.random()*6)+1;
    const combox=cboxes[compoRun-1];
    if(playerRun===compoRun)
    {
        event.target.classList.add('out-highlight');
        combox.classList.add('out-highlight');
        setTimeout(() => {
            event.target.classList.remove('out-highlight');
            combox.classList.remove('out-highlight');
        },500);
    }
    else{
        event.target.classList.add('computer-highlight');
        combox.classList.add('highlight');
        setTimeout(() => {
            event.target.classList.remove('computer-highlight');
            combox.classList.remove('highlight');
        }, 500);
    }
    if(playerRun===compoRun)
    {
        pboxes.forEach((box)=>{
            box.disabled=true;
        })
        outmsg.classList.remove("hide");
        outmsg.textContent=`OUT! Compo scored ${bowling1_score} runs! Now You will Bat . `;
        console.log("OUT!");
        const timeoutId=setTimeout(()=>{
            outmsg.textContent="Compo will Bowl Now.Get ready for Batting";
            pboxes.forEach((box)=>{
                box.disabled=false;
                box.removeEventListener('click',bowling1);
                box.addEventListener('click',batting2);
                document.querySelector('#batting-player').textContent=player;
                document.querySelector('#bowling-player').textContent="Compo";
            })
        },2000);
        activeTimeouts.push(timeoutId);
    }else{
        bowling1_score = bowling1_score + compoRun;
        composcore.textContent=`Compo🤖:${bowling1_score}`;
    }
}

const batting2=(event)=>{
    const playerRun = parseInt(event.target.textContent);
    const compoRun = Math.floor(Math.random() * 6) + 1;
    const combox = cboxes[compoRun - 1];

    if(playerRun===compoRun)
    {
        event.target.classList.add('out-highlight');
        combox.classList.add("out-highlight");
        setTimeout(()=>{
            event.target.classList.remove('out-highlight');
            combox.classList.remove('out-highlight');
        },500);
    }
    else{
        event.target.classList.add('highlight');
        combox.classList.add("computer-highlight");
        setTimeout(()=>{
            event.target.classList.remove('highlight');
            combox.classList.remove('computer-highlight');
        },500);
    }

    if (playerRun===compoRun)
    {
        pboxes.forEach((box) => {
            box.disabled = true;
        });
        outmsg.classList.remove('hide');
        outmsg.textContent = `OUT! Your scored ${batting2_score} runs!`;
        const timeoutId=setTimeout(()=>{
            win();
            fpscore.textContent=`Player Score:: ${batting2_score}`;
            fcscore.textContent=`Compo Score:: ${bowling1_score}`;
            fwinner.textContent="SORRY! COMPO Win the Game..You Lose😑";
        },1000);
         activeTimeouts.push(timeoutId);
    }else{
        batting2_score = batting2_score + playerRun;
        playerscore.textContent=`${player} Score: ${batting2_score}`;
    }

    if (bowling1_score < batting2_score)
    {
        pboxes.forEach((box) => {
            box.disabled = true;
        });
        const timeoutId=setTimeout(()=>{
            win();
            fpscore.textContent=`Player Score:: ${batting2_score}`;
            fcscore.textContent=`Compo Score:: ${bowling1_score}`;
            fwinner.textContent="Congratulation! You Win the Game🎉🎉";
        },1000);
        activeTimeouts.push(timeoutId);
    }
    else if (batting2_score === bowling1_score) {
        // check if all boxes are disabled (innings finished)
        const allDisabled = Array.from(pboxes).every(box => box.disabled);
        if (allDisabled) {
            console.log("It's a tie!");
            const timeoutId = setTimeout(() => {
                win();
                fpscore.textContent = `Player Score: ${batting2_score}`;
                fcscore.textContent = `Computer Score: ${bowling1_score}`;
                fwinner.textContent = "IT'S A TIE!";
            }, 1000);
            activeTimeouts.push(timeoutId);
        }
    }
}

const reset = () => {
    activeTimeouts.forEach(id => clearTimeout(id));
    activeTimeouts = [];

    restart.classList.add('hide');
    playerscore.classList.add('hide');
    composcore.classList.add('hide');
    playerscore.textContent = `${player} score: 0`;
    composcore.textContent = "Compo🤖 score: 0";
    thirdline.classList.add('hide');
    outmsg.classList.add('hide');
    outmsg.textContent = "";
    tossbtn.classList.remove('hide');   // ✅ only show it, don’t re‑add listener
    container.classList.add('hide');
    finalmsg.forEach(msg => msg.classList.add('hide'));

    batting1_score = 0;
    batting2_score = 0;
    bowling1_score = 0;
    bowling2_score = 0;

    pboxes.forEach((box) => {
        box.disabled = false;
        box.classList.remove('highlight', 'out-highlight', 'computer-highlight');
        box.removeEventListener('click', batting1);
        box.removeEventListener('click', bowling1);
        box.removeEventListener('click', batting2);
        box.removeEventListener('click', bowling2);
    });
};


restart.addEventListener('click', reset);
const newGame = () => {
    reset();
}
newgame.addEventListener('click', newGame);
const changePlayer = () => {
    reset();
    declarePlayer();
}
changeplayer.addEventListener('click', changePlayer);
