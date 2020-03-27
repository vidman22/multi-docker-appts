import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {isMobile } from 'react-device-detect';

import Map from '../../Components/Map/Map';

import './Location.css';
import NextButton from '../../Components/commonUI/NextButton';
import BackButton from '../../Components/commonUI/BackButton';
import LocationTitle from '../../Components/LocationTitle/LocationTitle';
import Locations from '../../Lists/Locations';
// import * as locationTypes from '../../Lists/LocationTypes';
import Providers from '../../Lists/PCPs';


let exactMatch = true;
const getSuggestions = value => {
  let inputValue = value.trim().toLowerCase();
  let inputLength = inputValue.length;
  let suggestions = [];

  for ( const prop in Locations){
    if (Locations[prop].name.toLowerCase().slice(0, inputLength) === inputValue){
      suggestions.push(Locations[prop])
    }
  }
  if (suggestions.length === 0 ){
    exactMatch = false;
    inputValue = value.trim().toLowerCase().split(" ");
    inputLength = inputValue.length;
    // console.log("inner fired");
    for (let i = 0; i < inputLength; i++){
      for (const prop in Locations ){
          if (Locations[prop].name.toLowerCase().indexOf(inputValue[i]) !== -1){
              suggestions.push(Locations[prop]);
          }
      }   
    }
  } 
  return suggestions = suggestions.filter((a, b) => suggestions.indexOf(a) === b );
}

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = (suggestion, {query, isHighlighted} ) => (
   
  <div className="InsuranceSuggestionsListItem" style={ isHighlighted ? {backgroundColor: '#55ba80', opacity:'.9', color:'white', width: 'auto'} : suggestion.style && suggestion.style }>
    {suggestion.name}
  </div>
);

export class Location extends Component {

    constructor(props){
        super(props);
          this.state = {
            title: '',
            toggle: false,
            value: '',
            nextDisabled: true,
            suggestions: [],
            link: '',
            locations: [],
            location: false,
          }
    }

    componentDidMount(){
      let location = '';
      if (this.props.locationid){
        for (const prop in Locations ){
          if (Locations[prop].myChartID === this.props.locationid){
            location = Locations[prop];
          }
        }
        console.log("this props location", location);
        this.setState({
          location
        })
      }
      let locations;
      let pcpName;
      if (this.props.pcpid){
        for (let i = 0; i < Providers.length; i++){
          if (this.props.pcpid === Providers[i].myChartID ){
            locations = Providers[i].locations;
            pcpName = Providers[i].firstName + ' ' + Providers[i].lastName + ' - ' + Providers[i].title;
          }
        }
        if (pcpName){
          locations = locations.length ? locations.map((loc) => {
              return Locations[loc]
          }) : locations;

          let locationMessage = '';

          for (let k = 0; k < locations.length; k++){
            locationMessage += ' ' + locations[k].name;
          }
          this.setState({
            title: locations.length ? `${pcpName}, works at these locations: ${locationMessage}` : `${pcpName}, might work at many locations, continue to the next step`,
          })

        }
      }
    }

    markerClicked =( title, link) => {
        this.setState({
          title,
          toggle: true,
          nextDisabled: false,
          link
        }, () => {

          this.props.sendmychartlink(link);
        })
    }

    onChange = (e, {newValue, method}) => {
      this.setState({
        value: newValue,
      })
    }
    onSuggestionsFetchRequested = ({ value, reason }) => {
     
      let suggestions = getSuggestions(value);
      
      this.setState({    
          suggestions
      })
  };

  onSuggestionsClearRequested = () => {

      this.setState({
          suggestions: [],
      });
  };

  onSuggestionSelected = (event, {suggestion}) => {
      event.preventDefault();
      // this.onResultClicked(suggestion, 'selected');       
  }

  storeInputReference = autosuggest => {
      if (autosuggest !== null) {
        this.input = autosuggest.input;
      }
  };

  clearLocation = () =>{
    this.setState({
      location: '',
    })
  }
    render() {
      const {suggestions, value, location} = this.state;
      const inputProps = {
        placeholder:'Search Locations',
        value,
        onChange: this.onChange,
        type: 'search',
    };
        return (
            <div className="LocationsWrapper">
              <BackButton content='font-awesome' changecomponent={() => this.props.changecomponent('visitType')} />
              <div className="LocationsFlex">
                <div className="LocationSearch">
                    {/* <LocationTitle title={this.state.title} /> */}
                    {location ? (
                      <div className="AddressDisplay">
                      <h1>{location.name}</h1>
                      <h4>Address</h4>
                      <span>{location.address + ' ' + location.suite}</span>
                      <span>{location.city}, {location.state} {location.zip}</span>
        
                    </div>
                    ): 
                    <Autosuggest
                        focusInputOnSuggestionClick={!isMobile}
                        getSuggestionValue={getSuggestionValue}
                        highlightFirstSuggestion={exactMatch}
                        inputProps={inputProps}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={renderSuggestion}
                        ref={this.storeInputReference}
                        shouldRenderSuggestions={() => true}
                        suggestions={suggestions}
                    />
                    } 
                    <div className="ButtonWrappers">
                      
                      <button className="ChooseAnotherLocation" onClick={()=> this.clearLocation()}>Choose Another Location</button>
                      <NextButton disabled={this.state.nextDisabled} name='Confirm' changecomponent={() => this.props.changecomponent('provider')} />
                    </div>
                </div>
                <Map markerclicked={this.markerClicked} locations={this.state.locations} />
              </div>
                
              
            </div>
        );
    }
}

export default Location;
