console.log("Проверка подключения JavaScript");
//====================================//
/*
ПЕРЕМЕННЫЕ
*/ 


start = document.querySelector("#start-btn"); // Кнопка Старт

console.dir(start);

lifes = document.querySelector("#lifes"); // Блок жизней

console.dir(lifes);

start.style.background = "green"; // Цвет кнопки на зеленый

start.style.height = "100px"; // Измени ширину и высоту кнопки, увеличь их на 100px

// Очки
var stars = null;
// Количество очков
var colichestvoOchkov = 0;



// Переменная для кнопки для старта игры

gamerSkin = "skin_1";

var startButton = document.querySelector("#start-btn");
// Переменная для блока игры
var startBlock = document.querySelector("#start");
// Переменная для игрового блока игры
var gameBlock = document.querySelector("#game");
// Количество жизней игрока
var countLifes = 5;

//====================================//



//====================================//
/*
РАБОТА С ИГРОВЫМ ПОЛЕМ
*/

// События для вызова функции startGame()
startButton.onclick = function()
{
	startGame();
}



// Скрывать блок Start и показывать блок Game (задание со звездой)
function startGame()
{
	
	startBlock.style.display = "none";
	gameBlock.style.display = "block";
	gamer.className = gamerSkin;
	createEnemy();
	createLifes();
	createStars();
	
	
}
//====================================//




//====================================//
/*
РАБОТА С ВРАГАМИ
*/ 
// Функция движение врага
function moveEnemy(enemy)
{
	
		let TimerID = setInterval(function()
		{
			enemy.style.left = enemy.offsetLeft - 5 + "px";
			
			if(colichestvoOchkov > 5)
			{
				enemy.style.left = enemy.offsetLeft - 10 + "px";
			}
			if(colichestvoOchkov > 10)
			{
				enemy.style.left = enemy.offsetLeft - 20 + "px";
			}
			
			if(enemy.offsetLeft < -20)
			{
				enemy.remove();
				
				// Создание врага
				createEnemy();
				// Очистка таймера
				clearInterval(TimerID);
				die();
			}
		}, 100);
	
}


// Функция создания врага
function createEnemy(){
	let enemy = document.createElement("div");
		enemy.className = "enemy " + typeEnemy();
		enemy.style.top = random(100 , document.querySelector("#app").clientHeight - 300 ) + "px";

	// Добавление врага на игровое поле
	gameBlock.appendChild(enemy);

	// Движение врага
	moveEnemy(enemy);
	
}
// Типы врагов
function typeEnemy()
{
	switch(random(1,3))
	{
		case 1:
		return "type-1";
		
		case 2:
		return "type-2";

		case 3:
		return "type-3";	
	}


	
}


//====================================//


//====================================//
/*
РАБОТА С ИГРОКОМ
*/ 

//Выбор игрока
selectSkin1 = document.querySelector("#skin_1");
console.dir(selectSkin1);
   selectSkin1.onclick = function(){
      selectSkin1.className = "selected";
      selectSkin2.className = "";
	 
      gamerSkin = "skin_1";
   }

selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function(){
      selectSkin2.className = "selected";
      selectSkin1.className = "";
	  
      gamerSkin = "skin_2";
   }



// Функция движение пули
function moveBullet(bullet)
{
	let TimerID = setInterval(function()
	{
		bullet.style.left = bullet.offsetLeft + 10 + "px";
		if (bullet.offsetLeft > document.querySelector("body").clientWidth)
		{
			bullet.remove();
			
			// Очистка таймера
			clearInterval(TimerID);
			
		}
		
		isBoom(bullet);
	}, 10);
	
}

// Функция создание пули
function createBullet()
{
	let bullet = document.createElement("div");
		if(gamerSkin == "skin_1")
		{
			bullet.className = "bullet_1";
		}
		if(gamerSkin == "skin_2")
		{
			bullet.className = "bullet_2";
		}
		
		bullet.style.top = gamer.offsetTop + 140 + "px";

	gameBlock.appendChild(bullet);
	moveBullet(bullet);
}

// Переменная для выбора игрока
var gamer = document.querySelector("#player");
// Движения игрока по кнопкам
document.onkeydown = function(event)
	{
		
		if (event.keyCode == 87 && gamer.offsetTop > 100) // Кнопка для передвижения вверх
		{
			gamer.style.top = gamer.offsetTop - 40 + "px";
		}
		if(event.keyCode == 83 && gamer.offsetTop < 380) // Кнопка для передвижения вниз
		{
			gamer.style.top = gamer.offsetTop + 40 + "px";
		}
		if(event.keyCode == 32) // Кнопка для выстрела (пробел)
		{
			createBullet();
			if(gamerSkin == "skin_1")
			{
				soundShot_1();
			}
			if(gamerSkin == "skin_2")
			{
				soundShot_2();
			}

			
		}
		
	}

// Функция попадание пули во врага
function isBoom(bullet)
{
	let enemy = document.querySelector(".enemy");

	if (bullet.offsetTop > enemy.offsetTop 
		&& bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
		&& bullet.offsetLeft > enemy.offsetLeft) 
	{
		if(enemy.className == 'enemy type-1')
		{
			enemy.className = 'boom type-1';
			
		}
		if(enemy.className == 'enemy type-2')
		{
			enemy.className = 'boom type-2';
		}
		if(enemy.className == 'enemy type-3')
		{
			enemy.className = 'boom type-3';
		}
		
		bullet.remove();
		clearInterval(enemy.dataset.timer);
		// Увеличиваем счет игры
		colichestvoOchkov = colichestvoOchkov + 1;
		// меняем текст счета игры
        stars.innerText = colichestvoOchkov;
		// Таймер для показа эффекта взрыва
		let timer = setTimeout(function() {
			enemy.remove();
			soundBoom();
			createEnemy();
			clearInterval(timer);
		}, 1000)
	}
	if(stars.innerText == 20)
	{
		
		winGame();
		
	}

}


// Функция отнимание жизни при настиге врага
function die()
{
	countLifes = countLifes - 1;
	if (countLifes <= 0)
	{
		endGame();
	}
	createLifes();
}
// Фунция создание жизней
function createLifes()
{
	let lifesBlock = document.querySelector("#lifes");
		lifesBlock.innerHTML = "";
	let count = 0;
	while(count < countLifes)
	{
		let span = document.createElement("span");
		lifesBlock.appendChild(span);
		count = count + 1;
	}
}
// Фунция создание очков
function createStars() {
	
	stars = document.createElement("div");
	console.dir(stars);
	stars.id = "stars";
	stars.innerText = 0;
	// добавляем блок очков в игровое поле
	gameBlock.appendChild(stars);
	
 }

//====================================//





//====================================//
/*
РАБОТА СО ЗВУКОМ
*/ 
// Переменная для загрузки файла аудио
var source = document.querySelector("audio source");
// Переменная для игры аудио
var player = document.querySelector("audio");
console.log(player);
// Переменная для выключения звука аудио
var sound = "off";
// Переменная для выбора картинки аудио
var soundButton = document.querySelector("#sound img");
// Функция включения и выключения аудио
soundButton.onclick = function()
{
	if(sound == "on")
	{
        // Выключить звук
		soundButton.src = "images/mute_sound.png";
		sound = "off";
        player.pause();
	}
	else
	{
        // Включить звук
		soundButton.src = "images/sound_on.png";
		sound = "on";
        player.play();
	}
}






// Звук выстрела
function soundShot_1() {
    var audioS = new Audio(); // Создаём новый элемент Audio
    audioS.src = 'images/drop-tools-2_g13ryted.mp3'; // Указываем путь к звуку 
    audioS.play (); // запускаем
}
function soundShot_2() {
    var audioS = new Audio(); // Создаём новый элемент Audio
    audioS.src = 'images/shot_2.mp3'; // Указываем путь к звуку 
    audioS.play (); // запускаем
}

// Звук взрыва
function soundBoom() {
    var audioB = new Audio(); // Создаём новый элемент Audio
    audioB.src = 'images/sound_shot_striker.mp3'; // Указываем путь к звуку 
    audioB.play (); // запускаем
}
// Звук врага
function soundEnemy() {
    var audioE = new Audio(); // Создаём новый элемент Audio
    audioE.src = 'images/sound_run_striker.mp3'; // Указываем путь к звуку 
    audioE.play (); // запускаем
}





//====================================//

function random(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


// Функция конца игры
function endGame()
{
	let scoreBlock = document.querySelector("#end h3 span");
	scoreBlock.innerText = colichestvoOchkov;

	gameBlock.innerHTML = " ";
	let endBlock = document.querySelector("#end");
	endBlock.style.display = "block";

	let restartButton = document.querySelector("#end button");
	restartButton.onclick = restart;
}
// Функция победителя
function winGame()
{
	let scoreBlock = document.querySelector("#win h3 span");
	scoreBlock.innerText = colichestvoOchkov;
	gameBlock.innerHTML = " ";

	let winBlock = document.querySelector("#win");
	winBlock.style.display = "block";

	let winnerButton = document.querySelector("#win button");
	winnerButton.onclick = restart;
	
}
// Функция рестарта
function restart()
{
	location.reload();
}
