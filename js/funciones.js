
//funcuiones de los eventos del teclado
			function keyDownHandler(e){
				if(e.keyCode == 39){
					rightPressed= true;
				}else if (e.keyCode == 37){
				leftPressed= true;
					}
			}//fin de funcion keyDownHandler

			function keyUpHandler(e){
			if(e.keyCode == 39){
				rightPressed= false;
			}else if (e.keyCode == 37){
				leftPressed= false;
			}
			}//fin de funciomn keyUpHandler
//===============================================================================================================

/*Una función para detectar colisionesSecció*/
	function collisionDetection(){
		for(c=0; c<brickColumnCount;c++){
			for(r=0; r<brickRowCount; r++){
				var b = bricks[c][r]; // b.x  -- b.y
				if(b.status==1){				
				//Calculo
				/*Si el centro de la bola está dentro de las coordenadas de uno de nuestros ladrillos, cambiaremos la dirección de la bola. Se cumplirá que el centro de la bola está dentro de ladrillo si se cumplen al mismo tiempo estas cuatro condiciones:
				La posición "x" de la bola es mayor que la posición "x" del ladrillo
				La posición "x" de la bola es menor que la posición del ladrillo más el ancho del ladrillo
				La posición "y" de la bola es mayor que la posición "y" del ladrillo.
				La posición "y" de la bola es menor que la posición del ladrillo más su altura.*/
					if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight ){
						dy = -dy;
					/*si el ladrillo está activo (status 1) comprobaremos si hay colisión.
				 	Si hay colisión, pondremos el "status" de ese ladrillo a 0 para no volver a pintarlo.*/
				 	b.status = 0;
				 	score++;
				 	/*Para sumar un punto cada vez que se rompe un ladrillo,*/
				 	/*Mostrar un mensaje de victoria cuando se hayan destruido todos los ladrillos*/
				 	if(score==brickRowCount*brickColumnCount){
				 		alert("Felicidades Ganaste");
				 		document.location.reload();
						}
					}
				}
			}
		}
	}//fin de funcion collisionDetection


	
	//funcion para dibujar la bola
	function drawBall(){
			ctx.beginPath();
			ctx.arc(x, y, ballRadius, 0, Math.PI*2);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
	}//fin de funcion drawBall


	//funcion para dibujar la paleta
	function drawPaddle(){
			ctx.beginPath();
			ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}

	/*Dibujar los bloques*/	
	function drawBricks(){
		for(var c=0; c<brickColumnCount; c++){
			for(var r=0; r<brickRowCount; r++){
				/*A continuación consultaremos el "status" de cada ladrillo para saber
				 si lo tenemos que dibujar o no. Si "status" vale 1, lo dibujaremos. 
				 Si vale 0, no lo dibujaremos porque habrá sido golpeado por la bola. */
				 if(bricks[c][r].status==1){
				/*Vamos a calcular en qué posición "x" e "y" se tiene que dibujar
				 cada ladrillo así:*/
				var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095D";
				ctx.fill();
				ctx.closePath();
				}
			}
		}
		/*
		Cada ladrillo se dibujará en la posición (0, 0), tendrá un ancho brickWidth 
		y un alto de brickHeight.
		/*El primer ladrillo se dibujará arriba a la izquierda, concretamente en (brickoffsetLeft,
		 brickOffsetTop), porque c y r valen 0.
		El siguiente ladrillo (columna 0, fila 1) se dibujará más abajo.*/
	}//fin de funcion drawBricks

	
	//Funcion para devolver el resultado
	function drawScore(){
		ctx.font = "16xp Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score : "+score, 8, 20);
	}

	//funcion para dar vidas al jugador
	 function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }
	