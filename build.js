'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            running: false,
            savedTimes: []

        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(this.state.times.minutes) + ':' + pad0(this.state.times.seconds) + ':' + pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.state.running = true;
                this.state.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var times = this.state.times;
            times.miliseconds += 1;
            if (times.miliseconds >= 100) {
                times.seconds += 1;
                times.miliseconds = 0;
            }
            if (times.seconds >= 60) {
                times.minutes += 1;
                times.seconds = 0;
            }
            this.setState({ times: times });
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.state.running = false;
            clearInterval(this.state.watch);
        }
    }, {
        key: 'save',
        value: function save() {
            var savedTime = this.format(this.state.times);
            this.state.savedTimes.push(savedTime);
            this.formatTimeTable();
        }
    }, {
        key: 'resetTimeTable',
        value: function resetTimeTable() {
            this.state.savedTimes = [];
            this.formatTimeTable();
        }
    }, {
        key: 'restart',
        value: function restart() {
            this.state.running = false;
            this.reset();
        }
    }, {
        key: 'formatTimeTable',
        value: function formatTimeTable() {
            var savedItems = [];
            for (var i = 0; i < this.state.savedTimes.length; i++) {
                savedItems.push(React.createElement(
                    'li',
                    null,
                    this.state.savedTimes[i]
                ));
            }
            return savedItems.map(function (savedItems) {
                return React.createElement(
                    'li',
                    null,
                    savedItems
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { className: 'app' },
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'div',
                        { className: 'btn' },
                        React.createElement(
                            'a',
                            { href: "#", className: 'button', id: 'start', onClick: function onClick() {
                                    return _this3.start();
                                } },
                            'Start'
                        ),
                        React.createElement(
                            'a',
                            { href: "#", className: 'button', id: 'stop', onClick: function onClick() {
                                    return _this3.stop();
                                } },
                            'Stop'
                        ),
                        React.createElement(
                            'a',
                            { href: "#", className: 'button', id: 'reset', onClick: function onClick() {
                                    return _this3.reset();
                                } },
                            'Reset'
                        ),
                        React.createElement(
                            'a',
                            { href: "#", className: 'button', id: 'save', onClick: function onClick() {
                                    return _this3.save();
                                } },
                            'Save Time'
                        ),
                        React.createElement(
                            'a',
                            { href: "#", className: 'button', id: 'resetTable', onClick: function onClick() {
                                    return _this3.resetTimeTable();
                                } },
                            'Reset timetable'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stopwatch' },
                        React.createElement(
                            'h3',
                            null,
                            this.format()
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'table' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'h3',
                                null,
                                'List of times:'
                            ),
                            React.createElement(
                                'ul',
                                null,
                                this.formatTimeTable()
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

;

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var app = document.getElementById('app');
ReactDOM.render(React.createElement(Stopwatch, null), app);
