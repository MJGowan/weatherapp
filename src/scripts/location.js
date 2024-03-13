import { useState } from "react";

export default function useLocation(){
    const [location, setLocation] = useState('');
    return [location, setLocation];
}