<template>
  <div>
    <a-empty v-show="showEmpty" :description="$t('base.developing')"/>
    <canvas id="canvas_ball" class="cav_ball"></canvas>
  </div>
</template>

<script>
import {Button, PageHeader, Empty} from 'ant-design-vue'

export default {
  name: "test",
  components: {
    [Empty.name]: Empty,
    [PageHeader.name]: PageHeader,
    [Button.name]: Button
  },
  data() {
    return {
      showEmpty: true,
      RADIUS: 7,
      WIN_WIDTH:0,
      WIN_HEIGHT:0,
      balls: [],
      colors: ['#EDB335', '#FF4D4F', '#1890FF', '#52C41A'],
      timer: null
    }
  },
  methods: {
    updateBalls() {
      this.balls.forEach((ball, index) => {
        typeof (index)
        const [RADIUS,WIN_WIDTH,WIN_HEIGHT] = [this.RADIUS,this.WIN_WIDTH,this.WIN_HEIGHT]
        ball.x += ball.vx
        ball.y += ball.vy
        ball.vy += ball.g
        if (ball.y >= WIN_HEIGHT - RADIUS) {
          ball.y = WIN_HEIGHT - RADIUS
          ball.vy = -ball.vy * 0.75
        }

        let cnt = 0
        const MAXNUM = 100
        this.balls.forEach((item, index) => {
          typeof (index)
          if (item.x + RADIUS > 0 && item.x - RADIUS < WIN_WIDTH)
            this.balls[cnt++] = item
        }) //在这个屏幕内的小球
        while (this.balls.length > cnt) {
          this.balls.pop()
        }//删除屏幕外的小球
        if (this.balls.length - MAXNUM) {
          let delLen = this.balls.length - MAXNUM
          for (let i = 0; i < delLen; i++) {
            let max = this.balls.length - 20
            let min = 1
            let num = Math.floor(Math.random() * (max - min + 1) + min)
            this.balls.splice(num, 1)
          }
        }//随机删除超出MAXNUM个的球
      })
    },
    initBall() {
      let canvas = document.getElementById('canvas_ball')
      let context = canvas.getContext('2d')

      this.WIN_WIDTH = canvas.clientWidth
      this.WIN_HEIGHT = canvas.clientHeight
      const timeW = this.WIN_WIDTH > 1000 ? 1000 : this.WIN_WIDTH
      this.RADIUS = Math.round(timeW * 4 / 5 / 98) -1

      this.timer = setInterval(() => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        const x = 100
        const y = 100
        const nz = [
          [0, 0, 1, 1, 1, 0, 0],
          [0, 1, 1, 0, 1, 1, 0],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [1, 1, 0, 0, 0, 1, 1],
          [0, 1, 1, 0, 1, 1, 0],
          [0, 0, 1, 1, 1, 0, 0]
        ]
        nz.forEach((digit, i) => {
          digit.forEach((item, j) => {
            if (item == 1) {
              let aBall = {
                x: x + j * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
                y: y + i * 2 * (this.RADIUS + 1) + (this.RADIUS + 1),
                g: 1.5 + Math.random(),
                vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                vy: -10,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
              }
              this.balls.push(aBall)
            }
          })
        })

        this.updateBalls(context)

        this.balls.forEach((ball, index) => {
          typeof (index)
          context.fillStyle = ball.color
          context.beginPath()
          context.arc(ball.x, ball.y, this.RADIUS, 0, 2 * Math.PI, true)
          context.closePath()
          context.fill()
        })
      }, 50)
    }
  },
  mounted() {
    this.initBall()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>

.cav_ball {
  width: 100%;
  height: 100%;
}

</style>
