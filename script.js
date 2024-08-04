const html = document.querySelector('html')
const focusBt = document.querySelector('.app__card-button--foco')
const shortBt = document.querySelector('.app__card-button--curto')
const extensiveBt = document.querySelector('.app__card-button--longo')
const bottons = document.querySelectorAll('.app__card-button')

const contextImage = document.querySelector('.app__image')
const contextTitle = document.querySelector('.app__title')

const musicCheckbox = document.querySelector('#alternar-musica')
const startOrPauseBt = document.querySelector('#start-pause')
const startOrPauseContent = document.querySelector('#start-pause span')
const startOrPauseIcon = document.querySelector("#start-pause-icon")
const displayTimer = document.querySelector('#timer')


const music = new Audio('/sons/luna-rise-part-one.mp3')
const pauseAudio = new Audio('/sons/play.wav');
const playAudio= new Audio('/sons/pause.mp3');
const endAudio = new Audio('./sons/beep.mp3')
music.loop = true

let timeInSeconds = 1500
let timerRepeter = null



musicCheckbox.addEventListener('change', () => {
    if(music.paused) {
        music.play()
    } else {
        music.pause()
    }
})

focusBt.addEventListener('click', () => {
    timeInSeconds = 5
    alternContext('foco')
    focusBt.classList.add('active')
})

shortBt.addEventListener('click', () => {
    timeInSeconds = 3
    alternContext('descanso-curto')
    shortBt.classList.add('active')
})

extensiveBt.addEventListener('click', () => {
    timeInSeconds = 9
    alternContext('descanso-longo')
    extensiveBt.classList.add('active')
})

function alternContext(context) {
    showTimer()
    bottons.forEach(function (context){
        context.classList.remove('active')
    })
    html.setAttribute('data-contexto', context)
    contextImage.setAttribute('src', `/imagens/${context}.png`)
    switch (context) {
        case "foco":
            contextTitle.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            contextTitle.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            contextTitle.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
}

const countDown = () => {
    if(timeInSeconds <= 0){

        if(html.getAttribute('data-contexto') == 'foco'){
           const event = new CustomEvent("focusFinished")
           document.dispatchEvent(event)

        }

        endAudio.play()
        alert('Tempo finalizado!')
        reset()
        return
    }
    timeInSeconds -= 1
    showTimer()
}

startOrPauseBt.addEventListener('click', startOrPause)

function startOrPause() {
    if(timerRepeter){
        pauseAudio.play()
        reset()
        return
    }
    playAudio.play()
    
    timerRepeter = setInterval(countDown, 1000)
    startOrPauseContent.textContent = "Pausar"
    startOrPauseIcon.setAttribute("src", "./imagens/pause.png")
    startOrPause
}

function reset() {
    clearInterval(timerRepeter) 
    startOrPauseContent.textContent = "Começar"
    startOrPauseIcon.setAttribute("src", "./imagens/play_arrow.png")
    timerRepeter = null
}

function showTimer() {
    const timer = new Date(timeInSeconds * 1000)
    const formattedTimer = timer.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    displayTimer.innerHTML = `${formattedTimer}`
}

showTimer()

