import React, { useState } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import Booking from "../../components/Booking/Booking";

const TrainApi = () => {
    const [trainQuery, setTrainQuery] = useState("");
    const [stationSearchResult, setStationSearchResult] = useState([]);
    const [showStationSearchResult, setShowStationSearchResult] = useState(false);
    const [showTrainSearchResult, setShowTrainSearchResult] = useState(false);
    const [fromStationCode, setFromStationCode] = useState("");
    const [toStationCode, setToStationCode] = useState("");
    const [dateOfJourney, setDateOfJourney] = useState("");
    const [trainSearchResult, setTrainSearchResult] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/api/tours/getSingleTour/${id}`);

    const handleTrainChange = (event) => {
        setTrainQuery(event.target.value);
    }

    const handleFromStationChange = (event) => {
        setFromStationCode(event.target.value);
    }

    const handleToStationChange = (event) => {
        setToStationCode(event.target.value);
    }

    const handleDateChange = (event) => {
        setDateOfJourney(event.target.value);
    }

    const HandleStationSearch = () => {
        const options = {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v1/searchStation',
            params: { query: trainQuery },
            headers: {
                'X-RapidAPI-Key': 'b374cd316amshdbce8a6cd7ff15fp1ffc05jsn0b5eed863eb2',
                'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
            },
        };

        axios.request(options).then(response => {
            console.log(response.data);
            setStationSearchResult(response.data.data);
            setShowStationSearchResult(true);
        }).catch(error => {
            console.error(error);
        });
    }

    const handleTrainSearch = () => {
        const options = {
            method: 'GET',
            url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
            params: {
                fromStationCode,
                toStationCode,
                dateOfJourney
            },
            headers: {
                'X-RapidAPI-Key': 'b374cd316amshdbce8a6cd7ff15fp1ffc05jsn0b5eed863eb2',
                'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
            }
        };

        axios.request(options).then(response => {
            console.log(response.data);
            // Assuming the trains are under 'data' property
            setShowTrainSearchResult(true);
        }).catch(error => {
            console.error(error);
        });
    }

    // const handleBookTicket = async () => {
    //     try {
    //         navigate("/");
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        <div className="app">
            <h2>This is Engineer's desk Railway Website</h2>

            {/* Train Search */}
            <h3>Search Train</h3>
            <div>
                <input type="text" id="trainQuery" name="trainQuery" value={trainQuery} onChange={handleTrainChange} />
                <button type="button" onClick={HandleStationSearch}>Search Nearby Station</button>
            </div>
            <ul>
                <li>Station : modaj</li>
                <li>Station : nadiad</li>
            </ul>
            {/* Display Train Search Result */}
            {showStationSearchResult && (
                <div>
                    <h4>Train Search Result:</h4>
                    <ul>
                        {stationSearchResult.map((station, index) => (
                            <li key={index}>{station.name}</li>
                        ))}
                    </ul>

                </div>
            )}

            {/* Train Search */}
            <h3>Search Train Between Stations</h3>
            <div>
                <input type="text" id="fromStation" name="fromStation" value={fromStationCode} onChange={handleFromStationChange} placeholder="From Station Code" />
                <input type="text" id="toStation" name="toStation" value={toStationCode} onChange={handleToStationChange} placeholder="To Station Code" />
                <input type="date" id="dateOfJourney" name="dateOfJourney" value={dateOfJourney} onChange={handleDateChange} placeholder="Date of Journey" />
                <button type="button" onClick={handleTrainSearch}>Search Train</button>
            </div>
            <ul>
                <li>modaj to nadiad</li>
                <li>28km</li>
                <li>40rs</li>
                <Button onClick={() => navigate(`/thank-you`, { state: { tour } })}>
                    Book Now
                </Button>

                {/* <Button >
                    <Booking tour={tour} />
                </Button> */}
            </ul>
            {/* Display Train Search Result */}
            {showTrainSearchResult && (
                <div>
                    <h4>Train Search Result:</h4>
                    <ul>
                        {/* Assuming trainSearchResult is an array of train objects */}
                        {/* Replace trainSearchResult with the correct state variable */}
                        {trainSearchResult.map((train, index) => (
                            <li key={index}>{train.name}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}

export default TrainApi;
