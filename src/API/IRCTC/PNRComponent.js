import axios from "axios";
import React from "react";
// import './PNRStyle.css'

class PNRComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PNRNumber: "",
            PNRDetails: [],
            PassengerStatus: [],
            OnButtonClicked: false,
            ErrorMessage: "",
            IsErrorOccurred: false,
            trainQuery: "", // New state for train search
            trainSearchResult: [],// New state for storing search results
            showTrainSearchResult: false
        }
    }

    handleChange = (event) => {
        this.setState({
            PNRNumber: event.target.value
        });
    }

    handleTrainChange = (event) => {
        this.setState({
            trainQuery: event.target.value
        });
    }

    handleSubmit = () => {
        this.setState({
            PNRDetails: [],
            PassengerStatus: [],
            ErrorMessage: "",
            IsErrorOccurred: false
        });

        const options = {
            method: 'GET',
            url: 'api/Employee/GetPnrDetails',
            params: { pnrNumber: this.state.PNRNumber },
        };

        axios.request(options).then(response => {
            console.log(response.data);
            this.setState({
                PNRDetails: response.data.data,
                PassengerStatus: response.data.data.PassengerStatus,
                OnButtonClicked: true
            });
        }).catch(error => {
            this.setState({
                ErrorMessage: "Please enter the correct PNR...",
                IsErrorOccurred: true
            });
        });
    }

    handleTrainSearch = () => {
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
                trainSearchResult: response.data.data, // Assuming the stations are under 'data' property
                showTrainSearchResult: true
            });
        }).catch(error => {
            console.error(error);
        });
    }

    render() {
        return (
            <div className="app">
                <h2>This is Engineer's desk Railway Website</h2>
                <h3>Please enter your PNR Number</h3>
                <div>
                    <input type="text" id="pnr" name="pnr" value={this.state.PNRNumber} onChange={this.handleChange} />
                    <button type="submit" onClick={this.handleSubmit}>Search PNR</button>
                </div>

                {/* Train Search */}
                <h3>Search Train</h3>
                <div>
                    <input type="text" id="trainQuery" name="trainQuery" value={this.state.trainQuery} onChange={this.handleTrainChange} />
                    <button type="button" onClick={this.handleTrainSearch}>Search Train</button>
                </div>

                {/* Display Train Search Result */}
                {/* Display Train Search Result */}
                {this.state.showTrainSearchResult && (
                    <div>
                        <h4>Train Search Result:</h4>
                        <ul>
                            {this.state.trainSearchResult.map((station, index) => (
                                <li key={index}>{station.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* {Array.isArray(this.state.trainSearchResult) && this.state.trainSearchResult.length > 0 && (
                    <div>
                        <h4>Train Search Result:</h4>
                        <ul>
                            {this.state.trainSearchResult.map((train, index) => (
                                <li key={index}>{train.name}</li>
                            ))}
                        </ul>
                    </div>
                )} */}

                {/* {this.state.trainSearchResult.length > 0 && (
                    <div>
                        <h4>Train Search Result:</h4>
                        <ul>
                            {this.state.trainSearchResult.map((train, index) => (
                                <li key={index}>{train.name}</li>
                            ))}
                        </ul>
                    </div>
                )} */}

                {/* Display PNR Details */}
                {this.state.IsErrorOccurred ? (
                    <h5 className="errorMessage">{this.state.ErrorMessage}</h5>
                ) : this.state.OnButtonClicked && (
                    <div>
                        {/* Display PNR Details */}
                        <h3>PNR Details</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>PNR Number</th>
                                    <th>Train Number</th>
                                    <th>Train Name</th>
                                    <th>Source Station</th>
                                    <th>Destination Station</th>
                                    <th>Date of Journey</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.PNRDetails.Pnr}</td>
                                    <td>{this.state.PNRDetails.TrainNo}</td>
                                    <td>{this.state.PNRDetails.TrainName}</td>
                                    <td>{this.state.PNRDetails.BoardingStationName}</td>
                                    <td>{this.state.PNRDetails.ReservationUptoName}</td>
                                    <td>{this.state.PNRDetails.SourceDoj}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Display Passenger Status */}
                        <h3>Passenger Status</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Person No.</th>
                                    <th>Coach</th>
                                    <th>Berth</th>
                                    <th>Booking Status</th>
                                    <th>Current Status</th>
                                    <th>Precentage Prediction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.PassengerStatus.map((passenger, index) =>
                                    <tr key={index}>
                                        <td>{passenger.Number}</td>
                                        <td>{passenger.Coach}</td>
                                        <td>{passenger.Berth}</td>
                                        <td>{passenger.BookingStatus}</td>
                                        <td>{passenger.CurrentStatus}</td>
                                        <td>{passenger.PredictionPercentage}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        );
    }
}

export default PNRComponent;
