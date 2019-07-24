import React, {Component} from 'react';
import './App.css';

const store = {
  player: "",
  playersFns: [],
  subscribe(playerFn) {
    this.playersFns.push(playerFn);
  },
  change() {
    this.playersFns.forEach(fn => fn());
  }
};


class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 60,
      active: false
    };

    store.subscribe(() => {
      if(store.player !== props.player) {
        this.setState({ active:true });
        this.interval = setInterval(() => {
          this.setState(state => ({ time: state.time - 1 }));
        },1000);
      }
    })
  }

  render() {
    return (
      <div className={this.state.active ? 'clock active' : 'clock'} onClick={this.handleClick.bind(this)}>
        <span className='time'>{this.state.time > 0 ? this.state.time : 'LOSE'}</span>
      </div>
    )
  }

  handleClick() {
    if(store.player !== this.props.player){
      store.player = this.props.player;
      this.setState({ active: false });
      clearInterval(this.interval);
      store.change();
    }
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div>
        <h1>Chess Timer</h1>
        <div className='board'>        
          <Clock player='player 1' />
          <Clock player='player 2' />
        </div>
      </div>
    );
  }
}

export default Timer;