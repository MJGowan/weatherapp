import React, {useEffect} from 'react';
import useLocation from './location';
import star from '../assets/Star.png';
import filled from '../assets/StarFilled.png';

export function StarBtn() {
    const [location, setLocation] = useLocation();
    let fav = false;

    function isFav(){
        fav == true ? fav = false : fav = true;
        console.log(fav);
    }

    function checkLocation(){
        if(location != ''){
            isFav();
        }
    }

    if(fav == true){
        return (
            <img src={filled} id='starBtn' className='starBtn' onClick={checkLocation}/>
        )
    }else{
        return (
            <img src={star} id='starBtn' className='starBtn' onClick={checkLocation}/>
        )
    }

}
