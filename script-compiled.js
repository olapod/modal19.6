class Stopwatch extends React.Component {
    constructor(display) {
        super(display);
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.savedTimes = [];
        this.timeTable = document.querySelector('.results');
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;

        clearInterval(this.watch);
    }

    save() {
        this.running = false;
        this.savedTime = this.format(this.times);
        this.savedTimes.push(this.savedTime);
        this.printSavedTimes();
    }

    resetTimeTable() {

        this.savedTimes = [];
        this.timeTable.innerText = ' ';
    }

    restart() {
        this.running = false;
        this.reset();
        this.print();
    }

    formatTimeTable() {
        let savedItems = [];
        for (let i = 0; i < this.savedTimes.length; i++) {
            savedItems += `<li>${this.savedTimes[i]}</li>`;
        }
        return savedItems;
    }

    printSavedTimes() {

        this.timeTable.innerHTML = this.formatTimeTable();
    }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.restart());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());

let resetTableButton = document.getElementById('reset_table');
resetTableButton.addEventListener('click', () => stopwatch.resetTimeTable());

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(stopwatch, document.querySelector('.stopwatch'));
