function start() {//inicio da função start()
	$('#inicio').hide();


	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
  $("#fundoGame").append("<div id='placar'></div");
  $("#fundoGame").append("<div id='energia'></div");

	
	//Principais variáveis do jogo
	var jogo = {}
	var velocidade=5;
	var posicaoY = parseInt(Math.random()*334);
	var podeAtirar=true;
	var fimdeJogo=false;
  var pontos=0;
  var salvos=0;
  var perdidos=0;
  var energiaAtual=3;


  var somDisparo=document.getElementById("somDisparo");
  var somExplosao=document.getElementById("somExplosao");
  var musica=document.getElementById("musica");
  var somGameover=document.getElementById("somGameover");
  var somPerdido=document.getElementById("somPerdido");
  var somResgate=document.getElementById("somResgate");


  //musica em loop

  musica.addEventListener("ended",function(){musica.currentTime = 0; musica.play();},false);
  musica.play();



	var TECLA = {
		W:87,
		S:83,
		D:68
	}

	// Touch
  $("#jogador")
  .hammer({drag_max_touches:0})
  .on("touch drag",function(ev){
    var touches = ev.gesture.touches;

    ev.gesture.preventDefault();


    for(var t=0,len=touches.length; t<len;t++){
      var target=$(touches[t].target);
      target.css({ 
        zIndex:1337,
        top: touches[t].pageY-50
    });
      //Limita movimentação
      var topo = parseInt($("#jogador").css("top"));
      if (topo<=0){
        $("#jogador").css("top,0");

      }

      if (top>=410) {
        $("#jogador").css("top",434);

      }

    }

    
  });

	//Game loop
	jogo.timer = setInterval(loop, 30);//executar game loop a cada 30 milisegundos
	function loop(){
		moveFundo();
		disparo();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
		colisao();
    placar();
    energia();
    }//fim da funçao loop()

    function moveinimigo1(){
       	posicaoX = parseInt($("#inimigo1").css("left"));
       	$("#inimigo1").css("left",posicaoX-velocidade);
       	$("#inimigo1").css("top",posicaoY);

       	if (posicaoX<=0) {
       		posicaoY=parseInt(Math.random()* 334);
       		$("#inimigo1").css("left",694);
       		$("#inimigo1").css("top",posicaoY);
       	}


	} // fim da funçao moveinimigo1()

	function moveinimigo2(){

		posicaoX= parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-3);

		if (posicaoX<=0){
			$("#inimigo2").css("left",775);

		} 
    }//fim da função moveinimigo2()

    function moveamigo(){
        posicaoX= parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);

        if (posicaoX>906) {
          	$("#amigo").css("left",0);
        }
    }//fim da funçao moveamigo()


    function disparo(){
        if (podeAtirar==true) {
            podeAtirar=false;
            somDisparo.play();

            topo= parseInt($("#jogador").css("top"))
            posicaoX=parseInt($("#jogador").css("left"))
            tiroX=posicaoX+190;
            topoTiro=topo+37;
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top",topoTiro);
            $("#disparo").css("left",tiroX);
            var tempoDisparo=window.setInterval(executaDisparo,30);
        }// fecha pode atirar

        


        function executaDisparo(){
        	posicaoX=parseInt($("#disparo").css("left"));
        	$("#disparo").css("left",posicaoX+15);

        	if (posicaoX>900) {

        		window.clearInterval(tempoDisparo);
        		tempoDisparo=null;
        		$("#disparo").remove();
        		podeAtirar=true;
        	}
        }//fecha executaDisparo()
    } //fecha disparo()


    function colisao(){
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 =($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo"))) ;
        var colisao6 = ($("#inimigo2").collision($("#amigo")));


    	    // jogador com inimigo1
    	if (colisao1.length>0) {
        energiaAtual--;

    		inimigo1X = parseInt($("#inimigo1").css("left"));
    		inimigo1Y = parseInt($("#inimigo1").css("top"));
    		explosao1(inimigo1X,inimigo1Y);


    	    posicaoY=parseInt(Math.random()*334);
    	    $("#inimigo1").css("left",694);
    	    $("#inimigo1").css("top",posicaoY);
        }
     //jogador com inimigo2
        if (colisao2.length>0){
          energiaAtual--;


        	inimigo2X = parseInt($("#inimigo2").css("left"));
        	inimigo2Y = parseInt($("#inimigo2").css("top"));
        	explosao2(inimigo2X,inimigo2Y);

        	$("#inimigo2").remove();

        reposicionaInimigo2();


        }


     //Disparo com o inimigo1
        if (colisao3.length>0) {
        pontos=pontos+100;
                                                                                                                                
        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));


        explosao1(inimigo1X,inimigo1Y);
        $("#disparo").css("left",950);

        posicaoY= parseInt(Math.random()*344);
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);


        }

     // Disparo com o inimigo2
        if (colisao4.length>0) {
        pontos=pontos+50;
        inimigo2X = parseInt($("#inimigo2").css("left"));
        inimigo2Y = parseInt($("#inimigo2").css("top"));
        $("#inimigo2").remove();

        explosao2(inimigo2X,inimigo2Y);
        $("#disparo").css("left",950);

      reposicionaInimigo2();


        }

     //jogador com o amigo


        if (colisao5.length>0){
        somResgate.play();
        salvos++;

        reposicionaAmigo();
        $("#amigo").remove();


        }

        if (colisao6.length>0) {
        perdidos++;

        amigoX = parseInt($("#amigo").css("left"));
        amigoY = parseInt($("#amigo").css("top"));
        explosao3(amigoX,amigoY);
        $("#amigo").remove();


        reposicionaAmigo();


        }


    }//fim da funçaõ colisao()

   // Explosao1
    function explosao1(inimigo1X,inimigo1Y){


    somExplosao.play();
    $("#fundoGame").append("<div id='explosao1'></div>");
    $("#explosao1").css("background-image", "url(imgs/explosao.png)");

    var div=$("#explosao1");
    div.css("top",inimigo1Y);
    div.css("left",inimigo1X);
    div.animate({width:200,opacity:0}, "slow");

    var tempoExplosao=window.setInterval(removeExplosao,1000);          


        function  removeExplosao(){


           div.remove();

           window.clearInterval(tempoExplosao);
           tempoExplosao=null;
        }

    
    }//fim da funçao explosao1()


   // explosao2
  function explosao2(inimigo2X,inimigo2Y){
    somExplosao.play();
  	$("#fundoGame").append("<div id='explosao2'></div");
  	$("#explosao2").css("background-image","url(imgs/explosao.png)");

  	var div2=$("#explosao2");


  	div2.css("top",inimigo2Y);
  	div2.css("left",inimigo2X);
  	div2.animate({width:200,opacity:0},"slow");
  	var tempoExplosao2=window.setInterval(removeExplosao2,1000);


  	function removeExplosao2(){
  		div2.remove();
  		window.clearInterval(tempoExplosao2);
  		tempoExplosao2=null;


  	}
   


  }// fim da explosao2()

  //Reposiona inimigo2
    function reposicionaInimigo2(){

  	 var tempoColisao4=window.setInterval(reposiciona4, 5000);

  	    function reposiciona4(){
  	     	window.clearInterval(tempoColisao4);
  	     	tempoColisao4=null;

          if (fimdeJogo==false) {

          $("#fundoGame").append("<div id=inimigo2></div>");


          }


  	    }
    }//Explosâo3



    function explosao3 (amigoX,amigoY){
      somPerdido.play();

      $("#fundoGame").append("<div id ='explosao3' class='anima4'></div>");
      $("#explosao3").css("top",amigoY);
      $("#explosao3").css("left",amigoX);

      var tempoExplosao3=window.setInterval(resetaExplosao3,1000);

      function resetaExplosao3(){

        $("#explosao3").remove();
        window.clearInterval(tempoExplosao3);
        tempoExplosao3=null;

      
      }
       }//fim da função explosão2()

    
    
     //função placar
    function placar(){
    $("#placar").html("<h2> pontos:"+ pontos+"salvos:"+salvos+"perdidos:"+ perdidos+"</h2>");

    }// fim da função  placar()

    //Barra de energia
    function energia(){
      if (energiaAtual==3) {
        $("#energia").css("background-image","url(imgs/energia3.png)");

      }
      if (energiaAtual==2) {
        $("#energia").css("background-image","url(imgs/energia2.png)");

      }

      if (energiaAtual==1) {
        $("#energia1").css("background-image","url(imgs/energia1.png)");

      }

      if (energiaAtual==0) {
        $("#energia").css("background-image","url(imgs/energia0.png)");

        //Game Over
        gameOver();
      }
    
    }// fim da função energia()

    //Função GAME OVER

    function gameOver() {

      fimdeJogo=true;
      musica.pause();
      somGameover.play();


      window.clearInterval(jogo.timer);
      jogo.timer=null;


      $("#jogador").remove();
      $("#inimigo1").remove();
      $("#inimigo2").remove();
      $("#amigo").remove();

      $("#fundoGame").append("<div id='fim'></div");


      $("#fim").html("<h1>Game Over</h1><p>sua pontuação foi:"+ pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>jogar novamente</h3></div>");

    }//fim da função gameOver();



  

    //reposiciona Amigo

    function reposicionaAmigo(){

    var tempoAmigo=window.setInterval(reposiciona6, 6000);


     	function reposiciona6(){

     	   	window.clearInterval(tempoAmigo);
     	   	tempoAmigo=null;

     	   if (fimdeJogo==false) {

     	   $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

     	   }


     	}

    }//fim da funçao reposicionaAmigo()





    
                   




    function moveFundo(){
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $('#fundoGame').css("background-position", esquerda - 1);                  
                  
     }//fim da função 


	//esta funcao tem por objetivo detectar que uma tecla foi pressionada
	//se a tecla W for pressionada o angulo y do jogador
	//é igual ao subtração de 10.

	//se a tecla S for pressionada o angulo y do jogador
	//é igual a adição de 10.

    function moveJogador(){
        if(jogo.pressionou[TECLA.W]){
			var topo = parseInt($("#jogador").css("top"));
			$('#jogador').css("top", topo-10);
		}
	
    
    

	    if(topo <= 0){


		 $("#jogador").css('top', topo + 10);
			
		}
        

		if(jogo.pressionou[TECLA.S]){
			var topo = parseInt($("#jogador").css("top"));
			$('#jogador').css("top", topo+10); 

			if(topo>=434){
				$("#jogador").css("top",topo-10);
			}
		}

		if(jogo.pressionou[TECLA.D]){
			//CHAMA FUNCAO DESPARO
			disparo() ;
			//IMPLEMENTACAO FUTURA
		}
    }//fim da funçao movejogador()
}//fim da função start()


