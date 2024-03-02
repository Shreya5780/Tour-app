import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Booking from "../components/Booking/Booking";
// const { tourId } = useParams();

class FlightSearch extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            trainQuery: "", // New state for train search
            stationSearchResult: [],// New state for storing search results
            showStationSearchResult: false,
            showTrainSearchResult: false,
            fromStationCode: "",
            toStationCode: "",
            dateOfJourney: "",
        }
    }

    handleTrainChange = (event) => {
        this.setState({
            trainQuery: event.target.value
        });
    }

    handleFromStationChange = (event) => {
        this.setState({
            fromStationCode: event.target.value
        });
    }

    handleToStationChange = (event) => {
        this.setState({
            toStationCode: event.target.value
        });
    }

    handleDateChange = (event) => {
        this.setState({
            dateOfJourney: event.target.value
        });
    }

    HandleStationSearch = () => {
        const options = {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v1/searchStation',
            params: { query: this.state.trainQuery },
            headers: {
                'X-RapidAPI-Key': 'b374cd316amshdbce8a6cd7ff15fp1ffc05jsn0b5eed863eb2',
                'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
            },
        };

        axios.request(options).then(response => {
            console.log(response.data);
            this.setState({
                stationSearchResult: response.data.data, // Assuming the stations are under 'data' property
                showStationSearchResult: true
            });
        }).catch(error => {
            console.error(error);
        });
    }

    handleTrainSearch = () => {
        const options = {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
            params: {
                fromStationCode: this.state.fromStationCode,
                toStationCode: this.state.toStationCode,
                dateOfJourney: this.state.dateOfJourney
            },
            headers: {
                'X-RapidAPI-Key': 'b374cd316amshdbce8a6cd7ff15fp1ffc05jsn0b5eed863eb2',
                'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
            }
        };

        axios.request(options).then(response => {
            console.log(response.data);
            this.setState({
                trainSearchResult: response.data.data, // Assuming the trains are under 'data' property
                showTrainSearchResult: true
            });
        }).catch(error => {
            console.error(error);
        });
    }


    // Inside your FlightSearch component

    handleBookTicket = async () => {
        const tourId = this.props.match.params.tourId;
        // const tourId = this.props.location.state.tourId; // Assuming you pass tourId via props
        try {
            // Make API call with tourId
            // const response = await axios.post('your_api_endpoint', { tourId });
            // Redirect to thank you page upon successful booking
            // this.props.navigate.push(`/thank-you/${tourId}`);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
       
        return (
            <div className="app">
                <h2>This is Engineer's desk Railway Website</h2>

                {/* Train Search */}
                <h3>Search Train</h3>
                <div>
                    <input type="text" id="trainQuery" name="trainQuery" value={this.state.trainQuery} onChange={this.handleTrainChange} />
                    <button type="button" onClick={this.HandleStationSearch}>Search Nearby Station</button>
                </div>
                <ul>
                    <li>Station : modaj</li>
                    <li>Station : nadiad</li>
                </ul>
                {/* Display Train Search Result */}
                {this.state.showStationSearchResult && (
                    <div>
                        <h4>Train Search Result:</h4>
                        <ul>
                            {this.state.stationSearchResult.map((station, index) => (
                                <li key={index}>{station.name}</li>
                            ))}
                        </ul>

                    </div>
                )}

                {/* Train Search */}
                <h3>Search Train Between Stations</h3>
                <div>
                    <input type="text" id="fromStation" name="fromStation" value={this.state.fromStationCode} onChange={this.handleFromStationChange} placeholder="From Station Code" />
                    <input type="text" id="toStation" name="toStation" value={this.state.toStationCode} onChange={this.handleToStationChange} placeholder="To Station Code" />
                    <input type="date" id="dateOfJourney" name="dateOfJourney" value={this.state.dateOfJourney} onChange={this.handleDateChange} placeholder="Date of Journey" />
                    <button type="button" onClick={this.handleTrainSearch}>Search Train</button>
                </div>
                <ul>
                    <li>modaj to nadiad</li>
                    <li>28km</li>
                    <li>40rs</li>
                    <Booking />

                    {/* <NavLink to={`/thank-you/${this.props.tourId}`}>Book now</NavLink> */}
                    {/* <button type="submit" onClick={this.handleBookTicket}>Book now</button> */}
                </ul>
                {/* Display Train Search Result */}
                {this.state.showTrainSearchResult && (
                    <div>
                        <h4>Train Search Result:</h4>
                        <ul>
                            {this.state.trainSearchResult.map((train, index) => (
                                <li key={index}>{train.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default FlightSearch;
