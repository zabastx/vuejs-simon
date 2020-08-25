Vue.config.productionTip = false

const app = new Vue({
    el: '#app',
    data: {
      buttons: [
          {
              id: 1,
              blue: true,
              active: false,
              sound: new Audio('./sounds/1.mp3')
          },
          {
              id: 2,
              red: true,
              active: false,
              sound: new Audio('./sounds/2.mp3')
          },
          {
              id: 3,
              yellow: true,
              active: false,
              sound: new Audio('./sounds/3.mp3')
          },
          {
              id: 4,
              green: true,
              active: false,
              sound: new Audio('./sounds/4.mp3')
          }
      ],
      mode: '1500',
      rounds: [],
      answers: [],
      message: '',
      gameOn: false,
      sequenceOn: true
    },

    methods: {
        clear() {
            this.rounds = []
            this.message = ''
            this.answers = []
        },
        activate(e) {
            e.active = true
            e.sound.currentTime = 0
            e.sound.play()
            setTimeout(() => {
                e.active = false
            }, 300)
        },
        async game() {
            const x = Math.floor(Math.random()*4+1)
            this.rounds.push(x)
            console.log(...this.rounds)
            this.sequenceOn = true
            const time = Number(this.mode)
            await Promise.all(Array.from(
                {length: this.rounds.length},
                (_, i) => new Promise(res => setTimeout(() => {
                    this.activate(this.buttons[this.rounds[i]-1])
                    res()
                }, i*time))
            ))
            this.sequenceOn = false
        },
        start() {
            this.gameOn = true
            this.clear()
            this.game()
        },
        clicked(e) {
            let status = false
            this.answers.push(e.id)
            for (let i in this.rounds) {
                if (this.rounds.includes(e.id)) {status = true}
                else {status = false}
            }
            if (status && this.answers.length === this.rounds.length) {
                this.answers = []
                this.game()
            }
            else if (!status && this.answers.length !== this.rounds.length) {
                this.clear()
                this.gameOn = false
                this.sequenceOn = true
                this.message = 'Ошибка'
            }
        },
        stop() {
            this.clear()
            this.gameOn = false
            this.sequenceOn = true
        }
    }
  })