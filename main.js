/*
	
	Stuff to handle ;-):
	1. Make the fields clickable (player0 uses "X", player1 "0")
        Eventlisteners on td -> onclick, create symbol x or o, change innerHTML
        add on all of them once, - loop?
	2. Keep track of all used fields (fieldsPlayed) and of the fields each player chose (fieldsPlayer0, fieldsPlayer1)
	3. Avoid that úsed fields can be played again and implement feedback like "Field already taken" (alert();)
	4. Check for winning combinations
	5. Implement feedback to the players (winning or game is a draw)
	6. End the game, avoid further playing
	7. Add a "Play again button"
    ---
	8. Implement "eternal" game statistics (using local storage!)
	9. Style the game as fancy and responsive as you can ;-)
	
	*/
	
	// global game variables
	var player, fields, fieldsPlayed, fieldsPlayer0, fieldsPlayer1, msg, playButton, playeroScore, player1Score, draw;

    player = 0;
    
    fields = [];
    fields = document.getElementsByTagName('td');
    //console.log(fields);

    fieldsPlayed = [];

    fieldsPlayer0 = [];
    fieldsPlayer1 = [];

    //Local storage variables
    playeroScore = 0;
    player1Score = 0;
    draw = 0;

    //Local storage - store data
    localStorage.getItem('playeroLS');
    localStorage.getItem('player1LS');
    localStorage.getItem('drawLS');

    if (localStorage.getItem('playeroLS') !== 0) {
        playeroScore = Number(localStorage.getItem('playeroLS'));
    }
    
    if (localStorage.getItem('player1LS') !== 0) {
        player1Score = Number(localStorage.getItem('player1LS'));
    }
    
    if (localStorage.getItem('drawLS') !== 0) {
        draw = Number(localStorage.getItem('drawLS'));
    }

    //Display scores
    document.getElementById('player_o').innerHTML = 'PLAYER O: ' + Number(localStorage.getItem('playeroLS'));
    document.getElementById('player_1').innerHTML = 'PLAYER X: ' + Number(localStorage.getItem('player1LS'));
    document.getElementById('draw_show').innerHTML = 'DRAW: ' + Number(localStorage.getItem('drawLS'));
   

    msg = document.getElementById('msg');
    playButton = document.getElementById('playAgain').addEventListener('click', playAgain);

    for (let i = 0; i<fields.length; i++){
        fields[i].addEventListener('click', play)
    }; 


	function play(){
		// game core mechanics, marking the fields
        if(fieldsPlayed.includes(this.id)){ //Check if the fields is available
            alert('No can do') //if the field is already taken
        }
        if (player === 0 && !fieldsPlayed.includes(this.id)) {
            this.innerHTML = 'X';
            this.style.color = 'white';
            this.style.font_size = '50px';
            fieldsPlayer0.push(parseInt(this.id)) //add to an array
            player = 1;
        } else if (player === 1 && !fieldsPlayed.includes(this.id)) {
            this.innerHTML= 'O';
            this.style.color = 'white';
            fieldsPlayer1.push(parseInt(this.id))
            player = 0;

        }
        fieldsPlayed.push(this.id); //add field id to the array
        console.log(fieldsPlayed);
        win(); //calling the function
	}
		
	function win(){
		// analyzing field choices, winning conditions, feedback
        if (
            fieldsPlayer0.includes(1) && fieldsPlayer0.includes(2) && fieldsPlayer0.includes(3) ||
            fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(6) ||
            fieldsPlayer0.includes(7) && fieldsPlayer0.includes(8) && fieldsPlayer0.includes(9) ||
            fieldsPlayer0.includes(1) && fieldsPlayer0.includes(4) && fieldsPlayer0.includes(5) ||
            fieldsPlayer0.includes(2) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(8) ||
            fieldsPlayer0.includes(3) && fieldsPlayer0.includes(6) && fieldsPlayer0.includes(9) ||
            fieldsPlayer0.includes(1) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(9) ||
            fieldsPlayer0.includes(3) && fieldsPlayer0.includes(5) && fieldsPlayer0.includes(7) 

        ) {
            //player 0 won
            msg.innerHTML = 'PLAYER X WON!'
            player1Score++;
            gameOver();
            gameStats();

        } else if (
            fieldsPlayer1.includes(1) && fieldsPlayer1.includes(2) && fieldsPlayer1.includes(3) ||
            fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(6) ||
            fieldsPlayer1.includes(7) && fieldsPlayer1.includes(8) && fieldsPlayer1.includes(9) ||
            fieldsPlayer1.includes(1) && fieldsPlayer1.includes(4) && fieldsPlayer1.includes(5) ||
            fieldsPlayer1.includes(2) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(8) ||
            fieldsPlayer1.includes(3) && fieldsPlayer1.includes(6) && fieldsPlayer1.includes(9) ||
            fieldsPlayer1.includes(1) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(9) ||
            fieldsPlayer1.includes(3) && fieldsPlayer1.includes(5) && fieldsPlayer1.includes(7) 
        ) {
            //player 1 won
            msg.innerHTML = 'PLAYER O WON!'
            playeroScore++;
            gameOver();
            gameStats();

        } else if(fieldsPlayed.length == 9) {
            //play is a draw
            msg.innerHTML = 'IT\'S A DRAW'
            draw++;
            gameOver();
            gameStats();

        }
	}

	function gameOver(){
		// ending the game 
        for (let i = 0; i<fields.length; i++){
        fields[i].removeEventListener('click', play)
    }; 
	
	}
	
	function playAgain(){
		// restart the game
        window.location.reload(true);
	}
	
	function gameStats(){
		// game stats using local storage
        localStorage.setItem('playeroLS', playeroScore);
        localStorage.setItem('player1LS', player1Score);
        localStorage.setItem('drawLS', draw);

        localStorage.playeroLS = Number(localStorage.playeroLS);
	    localStorage.player1LS = Number(localStorage.player1LS);
	    localStorage.drawLS = Number(localStorage.drawLS);

	    document.getElementById('player_o').innerHTML = 'PLAYER O: ' + localStorage.playeroLS;
	    document.getElementById('player_1').innerHTML = 'PLAYER X: ' + localStorage.player1LS;
	    document.getElementById('draw_show').innerHTML = 'DRAW: ' + localStorage.drawLS;
	}
