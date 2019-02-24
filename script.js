class Stopwatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            running: false,
            savedTimes: [ ],
            watch: null
            
        }
    }

    reset() {
        this.setState({
            times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
            }
        });
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    

    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.state.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        
    }

    calculate() {
        const times = this.state.times;
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({times});
    }

    
    stop() {
        this.state.running = false;
         clearInterval(this.state.watch);
    }

    save() {
        this.state.running = false;
        let savedTime = this.format(this.state.times);
        this.savedTimes.push(savedTime);
        
    }

    resetTimeTable() {
        
        this.state.savedTimes = [];
        this.formatTimeTable ();
        
    }
    

    restart() {
        this.state.running = false;
        this.reset();
        
    }
    
    formatTimeTable () {
       let savedItems = [ ];
       for (let i =0; i < this.state.savedTimes.length; i++) {
       savedItems += `<li>${this.state.savedTimes[i]}</li>`
           }
       return savedItems;
    }

    render() {
        
        return (
            <div className={'app'}>
            <nav className={'controls'}>
                <div className={'btn'}>
                    <a href={"#"} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
                    <a href={"#"} className={'button'} id={'stop'} onClick={() => this.stop()}>Stop</a>
                    <a href={"#"} className={'button'} id={'reset'} onClick={() => this.reset()}>Reset</a>
                    <a href={"#"} className={'button'} id={'save'} onClick={() => this.save()}>Save Time</a>
                    <a href={"#"} className={'button'} id={'resetTable'} onClick={() => this.resetTimeTable()}>Reset timetable</a>
                </div>
                <div className={'stopwatch'}>
                    {this.format()}
                </div>
                <div className={'table'}>
                    <ul>
                        {this.formatTimeTable()}
                    </ul>
                </div>            
            </nav>
        </div>
        );
      }
};

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch/>, app);

