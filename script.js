window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var dx = 1;
    var dy = -1;
    var ballRadius = 10;
    var img = document.getElementById("source");
    var playerSizeX = 135 / 2;
    var playerSizeY = 161 / 2;
    var playerPX;
    var playerPY;
    var ballPX;
    var ballPY;
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var score = 0;
    var distance;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        } else if (e.keyCode == 38) {
            upPressed = true;
        } else if (e.keyCode == 40) {
            downPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        } else if (e.keyCode == 38) {
            upPressed = false;
        } else if (e.keyCode == 40) {
            downPressed = false;
        }
    }

    function collisionDetection() {
        //        playerCX = playerPX + playerSizeX/2;
        //        playerCY = playerPY + playerSizeY/2;
        if (ballPX > playerPX && ballPX < playerPX + playerSizeX && ballPY > playerPY && ballPY < playerPY + playerSizeY) {
            score++;
            getballP();
        }
    }

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function getplayerP() {
        playerPX = Math.floor(Math.random() * ((canvas.width - playerSizeX) - playerSizeX + 1)) + playerSizeX;
        playerPY = Math.floor(Math.random() * ((canvas.height - playerSizeY) - playerSizeY + 1)) + playerSizeY;
    }

    function getballP() {
        ballPX = Math.floor(Math.random() * ((canvas.width - ballRadius) - ballRadius + 1)) + ballRadius;
        ballPY = Math.floor(Math.random() * ((canvas.height - ballRadius) - ballRadius + 1)) + ballRadius;
    }

    getballP();

    function drawBall() {

        ctx.beginPath();
        ctx.arc(ballPX, ballPY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    getplayerP();

    function drawPlayer() {
        ctx.drawImage(img, 207, 28, playerSizeX * 2, playerSizeY * 2, playerPX, playerPY, playerSizeX, playerSizeY);
    }

    function drawTime() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        if (distance) {
            ctx.fillText("Time left: " + Math.floor(distance / 1000) + "s", 680, 20);
        }
    }

    var countDownDate = new Date().getTime() + 121000;
    var x = setInterval(function () {
        var now = new Date().getTime();
        distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
            clearInterval(x);
            alert("GAME OVER!");
            document.location.reload();
        }
    }, 1000);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTime();
        drawBall();
        drawPlayer();
        drawScore();
        collisionDetection();
        if (rightPressed && playerPX < canvas.width + playerSizeX) {
            playerPX += 10;
        } else if (leftPressed && playerPX + playerSizeX > 0) {
            playerPX -= 10;
        } else if (downPressed && playerPY < canvas.height + playerSizeY) {
            playerPY += 10;
        } else if (upPressed && playerPY + playerSizeY > 0) {
            playerPY -= 10;
        }
        if (rightPressed && playerPX > canvas.width) {
            playerPX = 0;
        } else if (leftPressed && playerPX + playerSizeX < 0) {
            playerPX = canvas.width;
        } else if (downPressed && playerPY > canvas.height) {
            playerPY = 0;
        } else if (upPressed && playerPY + playerSizeY < 0) {
            playerPY = canvas.height;
        }
        requestAnimationFrame(draw);
    }
    draw();



}
