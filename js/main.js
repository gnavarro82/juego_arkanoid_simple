		//Para que podamos visualizar los gráficos en el elemento <canvas>, primero tenemos que
	    //preparar una referencia a él en JavaScript.
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		//ctx para guardar el contexto de gráficos 2D, que es la herramienta  que realmente utilizaremos para dibujar.
			
			var ballRadius=10;/*mantendrá el radio del círculo dibujado y se utilizará para los cálculos. */
			var x = canvas.width/2;
			var y = canvas.height-30;
			var dx = 2;
			var dy = -2;
			
			
			/* paleta para golpear la bola*/
			var paddleHeight = 10;
			var paddleWidth = 75;
			var paddleX = (canvas.width - paddleWidth)/2;
			/*paddleHeight servirá para definir la altura de la paleta, paddleWidth la anchura y paddleX la posición en el eje X en la que empieza a dibujarse*/

			/*Permitir que el usuario controle la paletaSección
			Podemos dibujar la paleta donde queramos, pero debería responder a las acciones 
			del usuario. Ha llegado la hora de implementar algunos controles de teclado. 
			Vamos a necesitar:

			Dos variables para guardar la información sobre si se ha pulsado el botón izquierdo
			 o el derecho.Dos funciones (event listeners) que respondan a los eventos keydown y keyup
			 (pulsar tecla, liberar tecla). Queremos que se ejecute algún código para manejar
			  la paleta cuando se pulsen los botones.
			Dos funciones que manejen los eventos keydown y keyup que se ejecutarán 
			cuando se pulsen los botones.La habilidad de mover la paleta a la izquierda 
			y a la derecha*/
			var rightPressed = false;
			var leftPressed = false;

			/*Declarar e inicializar las variables de los ladrillos*/
			var brickRowCount = 3;
			var brickColumnCount = 5;
			var brickWidth = 75;
			var brickHeight = 20;
			var brickPadding = 10;
			var brickOffsetTop = 30;
			var brickOffsetLeft = 30;
			/*Aquí hemos definido el número de filas (Row) y columnas (Column) de ladrillos, 
			su ancho (Width) y alto (Height), el hueco entre los ladrillos para que no 
			se toquen (Padding), y un margen superior (Top) e izquierdo (Left) 
			para que no se dibujen tocando los bordes.*/
			var bricks=[];
			for(var c=0; c <brickColumnCount;c++){
				bricks[c]=[];
				for (var r = 0; r < brickRowCount; r++) {
					bricks[c][r]={x:0, y:0, status: 1};
				}
			}
			/*Guardaremos nuestros ladrillos en una matriz bidimensional que contendrá las columnas (c) 
			de los ladrillos. Cada columna contendrá, a su vez, toda la fila (r) de ladrillos.
			 Cada ladrillo se va a representar con un objeto con las posiciones "x" e "y" en las que se dibujará.
			  Añade esto detrás de las definiciones de las variables:*/
			  /*El código anterior pasará por las filas y las columnas y creará los ladrillos. 
			  TEN EN CUENTA que esos objetos que representan a los ladrillos también se utilizarán para 
			  detectar colisiones más adelante.*/

			 /*El contador*/
			 var score = 0; 
			 var lives = 3;


			/*Para "escuchar" las pulsaciones de las teclas necesitamos definir dos
		 "escuchadores de eventos" (event listeners). Añade las líneas siguientes justo antes
		  de setInterval() al */
			document.addEventListener("keydown", keyDownHandler, false);
			document.addEventListener("keyup", keyUpHandler, false);
		

	function draw(){
			/*La bola está dejando un rastro porque estamos pintando un nuevo círculo en cada
			 fotograma sin borrar el anterior. No te preocupes, porque hay un método para borrar 
			 todo el contenido de lienzo: clearRect (). Este método tiene cuatro parámetros: 
			 las coordenadas x e y de la esquina superior izquierda de un rectángulo 
			 y las coordenadas x e y de la esquina inferior derecha de un rectángulo. 
			 En todo el área definida por ese rectángulo se borrará cualquier cosa 
			 que se haya pintado antes.
			 */
			ctx.clearRect(0,0,canvas.width, canvas.height);
			drawBricks();
       	    drawBall();
            drawPaddle();
       	    drawScore();
        	drawLives();
        	collisionDetection();
			
			//Implementar el final del juego
			///*En lugar de dejar que la pelota rebote en las cuatro paredes, vamos a permitir 
			///que lo haga sólo en tres: izquierda, arriba y derecha. Alcanzar la pared inferior 
			///supondrá el fin del juego.*/
			

			//Tenemos el borde superior e inferior cubiertos,
			if( x + dx > canvas.width-ballRadius || x + dx < ballRadius )
			{
				dx = -dx;
			}
			

			if(y + dy < ballRadius)
			{
				dy= -dy;

			}
			else if(y + dy > canvas.height - ballRadius)
			{
				/*Hacer que la pala golpee la bolaSección
				Para terminar esta lección sólo nos falta detectar la colisión de la bola y la 
				paleta para que pueda rebotar, volviendo hacia la zona de juego. 
				La manera más sencilla de hacerlo es comprobar 
				si el centro de la bola está entre los límites izquierdo y derecho de la paleta.
				 Actualiza el último fragmento del código, el "if else" de antes, 
				 para que te quede así:*/
				if(x > paddleX && x < paddleX + paddleWidth){
					dy = -dy;

				}else{
					lives--;
					if(!lives){
						alert("Fin del Juego");
						document.location.reload();//reseteo del juego
					}else{
						x=canvas.width/2;
						y=canvas.height-30;
						dx = 3;
						dy = -3;
						paddleX = (canvas.width - paddleWidth)/2;
					/*Ahora, cuando la bola toca el fondo, restamos una vida. 
					Si no queda ninguna, el jugador pierde y termina la partida. 
					Si queda alguna, entonces colocamos la bola y la paleta en el centro, 
					y hacemos que la bola vaya en la nueva dirección correcta 
					y a la velocidad inicial*/					
					}
				
				}
			}	
			/*Si la bola toca el borde inferior del lienzo (Canvas) debemos comprobar si golpea la pala. 
			Si es así, entonces rebota como el jugador se imagina que va a ocurrir; si no, el juego ha terminado.*/

			// izquierda y derecha.
			if(x + dx < 0 || x + dx > canvas.width)
			{
				dx= -dx;
			}

			/*Si se pulsa la flecha izquierda, la paleta se moverá 7 píxeles a la izquierda.
			 Si se pulsa la flecha derecha, se moverá 7 píxeles a la derecha. 
			 Aunque esto funciona bien, la paleta desaparece en los laterales del terreno 
			 e juego si mantenemos pulsada una tecla demasiado tiempo. 
			 Podemos mejorar esto para que se mueva dentro de los límites del canvas, */
			if(rightPressed && paddleX < canvas.width-paddleWidth){
				paddleX += 7;

			}
			else if (leftPressed && paddleX > 0){
				paddleX -=7;
			}


			/*La posición paddleX que estamos utilizando variará entre 0 para la lado izquierdo 
			y canvas.width-paddleWidth para el lado derecho, que es justo lo que queremos.*/

			/*Ahora viene la parte importante: queremos añadir un valor pequeño a x e y 
			después de que cada fotograma se haya dibujado para que parezca que la pelota 
			se está moviendo. Definamos estos valores pequeños como dx y dy, y
			establezcamos sus valores en 2 y -2 respectivamente. 
			Agrega lo siguiente debajo de sus definiciones de variables x e y:
			 */
			x += dx;
			y += dy;

		/*Mejorar el refresco con requestAnimationFrame()*/
		requestAnimationFrame(draw);

		}//fin de funcion draw


		/*Gracias a la naturaleza infinita de setInterval, la función draw () se llamará cada 10 milisegundos por siempre, o hasta que lo detengamos. Ahora, vamos a dibujar la bola. Agrega lo siguiente dentro de tu función draw ():
		 */
		//setInterval(draw, 10);
		
	
		draw();

	