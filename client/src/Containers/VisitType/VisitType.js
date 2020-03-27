import React, { Component } from 'react';
// import { useTransition, animated } from 'react-spring'
import NextButton from '../../Components/commonUI/NextButton';
import { withRouter} from 'react-router';

import './VisitType.css';

// const pages = [
//   ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}><AnnualVisit /></animated.div>,
//   ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}><FirstTime /></animated.div>,
// ]
// const transitions = useTransition(index, p => p, {
//   from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
//   enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
//   leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
// })


class VisitType extends Component {
  constructor(props){
    super(props);
      this.state = {
          annualPhysical: {
            value: '',
            valid: false,
            type: "radio",
            msg: '',
          },
          firstTime: {
            value: '',
            valid: false,
            type: "radio",
            msg: '',
          }
      }
      this.validate = this.validate.bind(this);
      this.next = this.next.bind(this);
  }

  handleChange = (e, type) => {
    const target = e.target;
    const name = target.name;
    const updatedElement = {...this.state[type]};

    updatedElement.value = name;
    updatedElement.touched = true;
    updatedElement.valid = true;
    updatedElement.msg = '';

    // console.log("updated El", updatedElement);
    // console.log("name", name);
    // console.log("type", type);
    this.setState({
      [type] : updatedElement
    }); 

  }

  validate() {
    let valid = true;
    for (let key in this.state){
      if (!this.state[key].valid){
        let updatedElement = {...this.state[key]}
        updatedElement.msg = 'please choose one';
        this.setState({
          [key]: updatedElement,
        })
      }
      valid = valid && this.state[key].valid;
    }
    return valid;
  }


  next(){
    const valid = this.validate();
    if (valid){
      this.props.changecomponent('finalPage')
    } else return;
  }


  render(){
    const {firstTime, annualPhysical} = this.state;

    return (
        <div className="CheckBoxWrapper">
          <h1>Visit Type</h1>
          <div className="CheckBoxFlex">
            <FirstTime firsttime={firstTime.value}  msg={firstTime.msg} changeinput={this.handleChange}/>
            <AnnualVisit annualphysical={annualPhysical.value} msg={ annualPhysical.msg} changeinput={this.handleChange} />
          
          </div>
          <div className="VisitTypeButton">
            <NextButton name='Next' changecomponent={this.next} />
          </div>
        </div>
    );
  }
}


export default withRouter(VisitType);


const FirstTime = (props) => {
  return (
    <div className="QuestionWrapper">
    <span>Have you been seen at any Perlman Clinic before?</span>
    <label className="VisitTypeRadioButton" >
      <input
        onChange={(e) => props.changeinput(e, 'firstTime')}
        type="radio"
        checked={props.firsttime === "returnee"}
        name='returnee'>
      </input>
      <span className="CustomVisitRadio"></span>
      <div>Yes, I have</div>
    </label>
    <label className="VisitTypeRadioButton" >
      <input
        onChange={(e) => props.changeinput(e,'firstTime')}
        type="radio"
        checked={props.firsttime === "firstTime"}
        name='firstTime'>
      </input>
      <span className="CustomVisitRadio"></span>
      <div>No, this is my first time</div>
    </label>
    {props.msg && <p>{props.msg}</p>}
  </div>
  );
}

const AnnualVisit = (props) => {
  return (
      <div className="QuestionWrapper">
        <span>What type of visit do you need?</span>
        <label className="VisitTypeRadioButton" >
          <input
            onChange={(e) => props.changeinput(e, 'annualPhysical')}
            type="radio"
            checked={props.annualphysical === 'officeVisit'}
            name='officeVisit'>
          </input>
          <span className="CustomVisitRadio"></span>
          <div>Office Visit</div>
        </label>
        <label className="VisitTypeRadioButton" >
          <input
            onChange={(e) => props.changeinput(e, "annualPhysical")}
            type="radio"
            checked={props.annualphysical === 'annualPhysical'}
            name='annualPhysical'>
          </input>
          <span className="CustomVisitRadio"></span>
          <div>Annual Physical Exam</div>
        </label>
        {props.msg && <p>{props.msg}</p>}
      </div>
  );
}
