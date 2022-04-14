function getRandomValue(min, max) {
    return (Math.random() * (max - min)) + min;
}

function limitDecimals(player, limit) {
    return parseFloat(player).toFixed(limit);
}

function attackHealthBarLimits(player, value) {
    if (player - value < 0) {
        return player = 0;
    } else {
        return player -= value;
    }
}

function healHealthBarLimits(player, value) {
    if (player + value > 100) {
        return player = 100;
    } else {
        return player += value;
    }
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            //min:5,Max:12
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = attackHealthBarLimits(this.monsterHealth, attackValue);
            this.monsterHealth = limitDecimals(this.monsterHealth, 0);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth = attackHealthBarLimits(this.playerHealth, attackValue);
            this.playerHealth = limitDecimals(this.playerHealth, 0);
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = getRandomValue(12, 25);
            this.monsterHealth = attackHealthBarLimits(this.monsterHealth, attackValue);
            this.monsterHealth = limitDecimals(this.monsterHealth, 0);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            this.playerHealth = healHealthBarLimits(this.playerHealth, healValue);
            this.playerHealth = limitDecimals(this.playerHealth, 0);
            this.attackPlayer();
        }
    },
    computed: {
        monsterBarStyle() {
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyle() {
            return { width: this.playerHealth + '%' }
        },
        canUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }

    },
    watch: {
        counter() {

        }
    }

});
app.mount('#game')