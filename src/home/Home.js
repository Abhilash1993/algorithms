import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../common/action_constants';
import { Link } from 'react-router-dom';
import JsonView from '../common/components/JsonView';
import { push } from 'react-router-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min : 0,
      max : 100,
      time: 0,
      isOn: false,
      start: 0
    };
  }
  check = () =>{
    
  }
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    });
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }
  stopTimer() {
    this.setState({isOn: false});
    clearInterval(this.timer);
  }
  resetTimer() {
    this.setState({time: 0, isOn: false});
  }
  onChangeHandle = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  render() {
    return (
      <div>
        <div>
          <input type = "text" name = "min" onChange = {this.onChangeHandle} value = {this.state.min}/>
        </div>
        <div>
          <input type = "text" name = "max" onChange = {this.onChangeHandle} value = {this.state.max}/>
        </div>
        <div>
          <input type = "button" onClick = {this.check} value = "Check" onClick = {this.startTimer}/>
        </div>
        <h1>{this.state.time}</h1>
      </div>
    );
  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type:ACTION.HOME.GETHOME});
   //dispatch(push('/about')); //to navigate to a different route
  }
}

const mapStateToProps = state => {
  return {
    home: state.home
  };
};

export default connect(mapStateToProps)(Home);
