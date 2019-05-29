import React, {Component} from 'react';

import TimerInput from '../../components/TimerInput/TimerInput';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import Speed from '../../components/Speed/Speed';
import Button from '../../UI/Button/Button';
import './Timer.css';

class Timer extends Component {
    state = {
        isOn: false,
        wasPaused: false,
        inputValue: "",
        minutes: "00",
        seconds: "00",
        speed: "normal",
        message: "",
        setTextColor: false
    };

    handleChange = event => {
        let value = +event.target.value.replace(/[^\d.]/g, '');
        let inputValue = value <= 9 ? '0' + value : value;
        this.setState({
            minutes: inputValue,
            inputValue: event.target.value.replace(/[^\d.]/g, '')
        });
    };

    blink = () => {
        this.setState(prevState => {
            return {
                setTextColor: !prevState.setTextColor
            };
        });
    };

    tick = () => {
        let min = Math.floor(this.secondsRemaining / 60);
        let sec = this.secondsRemaining - (min * 60);
        let time = min.toString() + "." + sec.toString();

        if (!this.state.wasPaused && this.state.isOn) {
            this.setState({
                isOn: this.state.isOn,
                minutes: min,
                seconds: sec
            });

            if (sec < 10) {
                this.setState({
                    seconds: "0" + sec,
                });
            }

            if (min < 10) {
                this.setState({
                    minutes: "0" + min,
                });
            }

            if ((this.state.inputValue / this.state.minutes === 2 && sec === 0) ||
                (this.state.inputValue - 0.4) / +time === 2) {
                this.setState({
                    message: "More than halfway there!"
                });
            }

            if (min === 0 && sec === 0) {
                this.setState({
                    message: "Time’s up!"
                });
                clearInterval(this.changeTextColor);
            }

            if (min === 0 && sec === 20) {
                this.setState({
                    setTextColor: true
                });
            }

            if (min === 0 && sec === 10) {
                this.changeTextColor = setInterval(this.blink, 500);
            }

            this.secondsRemaining--;

            let timer = setTimeout(this.tick, this.state.speed === "fastest" ? 100 : this.state.speed === "faster" ? 500 : 1000);

            if (min === 0 && sec === 0) {
                clearTimeout(timer);
            }
        }
    };

    startTimer = () => {
        let minutes = this.state.minutes;

        this.setState({
            isOn: true,
            wasPaused: false
        });

        setTimeout(this.tick, 1);

        this.secondsRemaining = !this.state.wasPaused ? minutes * 60 : this.state.seconds + minutes * 60;
    };

    pauseTimer = () => {
      this.setState({
          isOn: false,
          wasPaused: true
      });
    };

    resetTimer = () => {
        this.setState({
            isOn: false,
            wasPaused: false,
            minutes: "00",
            seconds: "00",
            inputValue: "",
            message: ""
        });
    };

    switchSpeedHandler = speed => {
        this.setState({speed});
    };

    render() {
        console.log(this.state.speed)
        let start = <Button
            clicked={this.startTimer}
            disabled={!this.state.inputValue.length}
            btnClass="start"
        >start</Button>;
        let pause = this.state.isOn ? <Button
            clicked={this.pauseTimer}
            btnClass="pause"
        ></Button> : null;
        let resume = this.state.wasPaused ? <Button
            clicked={this.startTimer}
            btnClass="resume"
        ></Button> : null;
        let reset = <Button
            clicked={this.resetTimer}
            btnClass="reset"
        >x</Button>;

        return(
            <div className="TimerWrapper">
                <TimerInput
                    handleChange={this.handleChange}
                    inputValue={this.state.inputValue}
                    start={start}
                    reset={reset}
                />
                <CountdownTimer
                    setTextColor={this.state.setTextColor}
                    message={this.state.message}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    pause={pause}
                    resume={resume}
                />
                {this.state.isOn && <Speed
                    switchSpeedHandler={this.switchSpeedHandler}
                    speed={this.state.speed}
                />}
            </div>
        )
    }
}

export default Timer;
