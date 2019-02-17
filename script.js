class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.savedTimes = [ ];
        
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
        
        // console.log(this.savedTimes);
    }


    

    restart() {
        this.running = false;
        this.reset();
        this.print();
    }

}

class TimeTable {

    constructor(displaySavedTimes) {
        this.displaySavedTimes = displaySavedTimes;
        this.timeTable = [];
               
    }

    saveTimes () {
        this.timeTable.push(stopwatch.savedTimes);
        console.log(this.timeTable);
    }

   formatTimeTable () {
        return `<li>${this.timeTable}</li>`
    }

    printSavedTimes() {
        this.displaySavedTimes.innerText = this.formatTimeTable(this.timeTable);
    }

    

    print () {
        
        this.printSavedTimes();
    }

 }




const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

const timeTable = new TimeTable(
document.querySelector('.results'));  


let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.restart());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save(), timeTable.print());

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}


