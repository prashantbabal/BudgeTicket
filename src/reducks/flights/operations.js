import { searchFlightsAction } from './actions';
import { db } from '../../firebase/';
import { push } from 'connected-react-router';
import sampleData from './sample.json';

let apiKey = '';
db.collection('/keys').doc('skyscanner').get().then((doc) => {
  apiKey = doc.data().key;
});

export const searchFlights = ({
  originAirport,
  destinationAirport,
  currency,
  departDate,
  returnDate,
  showError,
}) => {
  return (dispatch) => {

    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Key': process.env.REACT_APP_DEV_RAPID_API_KEY,
    //     'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
    //   },
    // };

    // const params = {
    //   "adults":1,
    //   "origin":"MUC",
    //   "destination":"BER",
    //   "departureDate":"2023-02-01",
    //   "returnDate":"2023-02-05",
    //   "currency":"EUR"
    // };
    
    // const query = new URLSearchParams(params);

    // fetch(`https://skyscanner44.p.rapidapi.com/search?${query}`, options)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.itineraries.buckets.length === 0) {
    //       showError('Could not find result. Please try with different airport or date.');
    //       return false;
    //     }
    //     dispatch(push('/search'));
    //     dispatch(searchFlightsAction(data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     showError('Failed to get results. Please try again later.');
    //   });

    dispatch(push('/search'));
    setTimeout(() => {
      dispatch(searchFlightsAction(sampleData));
    }, "1000")
  };
};
