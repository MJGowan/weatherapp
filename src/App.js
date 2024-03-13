import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import HighIcon from '@mui/icons-material/North';
import LowIcon from '@mui/icons-material/South';
import { Geocoding, CurrentDay, FiveDays } from './scripts/fetch';
import useLocation from './scripts/location';
import { StarBtn } from './scripts/starBtn';

function App() {
  const [input, setInput] = useState('');

  const handleInput = async event => {
    if (event.key == 'Enter') {
      const geoResponse = await Geocoding(input);
      currentDay(geoResponse.longitude, geoResponse.latitude);
      fiveDay(geoResponse.longitude, geoResponse.latitude);
    }
  }

  const [location, setLocation] = useLocation();
  const [currentTemp, setCurrentTemp] = useState('');
  const [high, setHigh] = useState('');
  const [low, setLow] = useState('');
  const [currentWeather, setCurrentWeather] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');

  const currentDay = async (longi, lati) => {
    const currentResponse = await CurrentDay(longi, lati);
    console.log(currentResponse);
    setLocation(currentResponse.location);
    setCurrentTemp(currentResponse.currentTemp);
    setHigh(currentResponse.maxTemp);
    setLow(currentResponse.minTemp);
    setCurrentWeather(currentResponse.currentWeather);
    setWeatherIcon(currentResponse.weatherIconSrc);
  }

  const [items, setItems] = useState([]);
  const [dayOne, setDayOne] = useState([]);
  const [dayTwo, setDayTwo] = useState([]);
  const [dayThree, setDayThree] = useState([]);
  const [dayFour, setDayFour] = useState([]);
  const [dayFive, setDayFive] = useState([]);

  const fiveDay = async (longi, lati) => {
    const fiveResponse = await FiveDays(longi, lati);
    console.log(fiveResponse);
    // setItems(fiveResponse.daysInfo);
    // console.log(items);
    setDayOne(fiveResponse.daysInfo[0]);
    setDayTwo(fiveResponse.daysInfo[1]);
    setDayThree(fiveResponse.daysInfo[2]);
    setDayFour(fiveResponse.daysInfo[3]);
    setDayFive(fiveResponse.daysInfo[4]);
  }

  return (
    <div className="App">
      <Container>
        <Row className='my-4'>
          <Col className='col-12'>
            <input type='text' placeholder='Search' className='input' onChange={e => setInput(e.target.value)} onKeyDown={e => handleInput(e)} />
          </Col>
        </Row>
        <Row className='my-5'>
          <Col className='col-5'>
            <div className='currentCard'>
              <Row>
                <Col className='col-12 text-center'>
                  <h1 className='currentLocal'>{location} <span><StarBtn /></span></h1>
                </Col>
                <hr/>
                <Col className='text-center'>
                  <img className='currentIcon' src={weatherIcon} />
                </Col>
                <Col>
                  <h1 className='currentTemp'>{currentTemp} °F</h1>
                </Col>
                <Col className='col-3 py-2'>
                  <h5 className='highTemp'><span><HighIcon/></span>{high}°</h5>
                  <h5 className='lowTemp'><span><LowIcon/></span>{low}°</h5>
                </Col>
              </Row>
              <Row>
                <Col className='col-12 my-2 text-center'>
                  <h4>{currentWeather}</h4>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr/>

        <Row className='my-5'>
          <Col>
            <div className='fiveCard'>
              <Row>
                <Col className='col-12 text-center'>
                  <h5>{dayOne.fiveDate}</h5>
                </Col>
                <Col className='col-12 d-flex justify-content-center'>
                  <img src={dayOne.fiveWeatherIconSrc} />
                </Col>
                <Col className='col-12 text-center'>
                  <p>{dayOne.fiveWeather}</p>
                </Col>
                <Col className='col-12 text-center'>
                  <h5>{dayOne.fiveTemp} °F</h5>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className='fiveCard'>
              <Row>
                <Col className='col-12 text-center'>
                  <h5>{dayTwo.fiveDate}</h5>
                </Col>
                <Col className='col-12 d-flex justify-content-center'>
                  <img src={dayTwo.fiveWeatherIconSrc} />
                </Col>
                <Col className='col-12 text-center'>
                  <p>{dayTwo.fiveWeather}</p>
                </Col>
                <Col className='col-12 text-center'>
                  <h5>{dayTwo.fiveTemp} °F</h5>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className='fiveCard'>
              <Row>
                <Col className='col-12 text-center'>
                  <h5>{dayThree.fiveDate}</h5>
                </Col>
                <Col className='col-12 d-flex justify-content-center'>
                  <img src={dayThree.fiveWeatherIconSrc} />
                </Col>
                <Col className='col-12 text-center'>
                  <p>{dayThree.fiveWeather}</p>
                </Col>
                <Col className='col-12 text-center'>
                  <h5>{dayThree.fiveTemp} °F</h5>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className='fiveCard'>
              <Row>
                <Col className='col-12 text-center'>
                  <h5>{dayFour.fiveDate}</h5>
                </Col>
                <Col className='col-12 d-flex justify-content-center'>
                  <img src={dayFour.fiveWeatherIconSrc} />
                </Col>
                <Col className='col-12 text-center'>
                  <p>{dayFour.fiveWeather}</p>
                </Col>
                <Col className='col-12 text-center'>
                  <h5>{dayFour.fiveTemp} °F</h5>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className='fiveCard'>
              <Row>
                <Col className='col-12 text-center'>
                  <h5>{dayFive.fiveDate}</h5>
                </Col>
                <Col className='col-12 d-flex justify-content-center'>
                  <img src={dayFive.fiveWeatherIconSrc} />
                </Col>
                <Col className='col-12 text-center'>
                  <p>{dayFive.fiveWeather}</p>
                </Col>
                <Col className='col-12 text-center'>
                  <h5>{dayFive.fiveTemp} °F</h5>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
