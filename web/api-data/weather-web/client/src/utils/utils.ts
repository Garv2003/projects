import logo1 from "../assests/images/weathericon/01d.png";
import logo2 from "../assests/images/weathericon/01n.png";
import logo3 from "../assests/images/weathericon/02d.png";
import logo4 from "../assests/images/weathericon/02n.png";
import logo5 from "../assests/images/weathericon/03d.png";
import logo6 from "../assests/images/weathericon/03n.png";
import logo7 from "../assests/images/weathericon/04d.png";
import logo8 from "../assests/images/weathericon/04n.png";
import logo9 from "../assests/images/weathericon/09d.png";
import logo10 from "../assests/images/weathericon/09n.png";
import logo11 from "../assests/images/weathericon/10d.png";
import logo12 from "../assests/images/weathericon/10n.png";
import logo13 from "../assests/images/weathericon/11d.png";
import logo14 from "../assests/images/weathericon/11n.png";
import logo15 from "../assests/images/weathericon/13d.png";
import logo16 from "../assests/images/weathericon/13n.png";
import logo17 from "../assests/images/weathericon/50d.png";
import logo18 from "../assests/images/weathericon/50n.png";

const icon: Icon
    = {
    "01d": logo1,
    "01n": logo2,
    "02d": logo3,
    "02n": logo4,
    "03d": logo5,
    "03n": logo6,
    "04d": logo7,
    "04n": logo8,
    "09d": logo9,
    "09n": logo10,
    "10d": logo11,
    "10n": logo12,
    "11d": logo13,
    "11n": logo14,
    "13d": logo15,
    "13n": logo16,
    "50d": logo17,
    "50n": logo18,
};

//@ts-ignore
const debounce = <F extends (...args: any[]) => void>(
    func: F,
    delay: number
): ((...args: Parameters<F>) => void) => {
    let debounceTimer: number;

    return (...args: Parameters<F>) => {
        let context = this;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay) as number;
    };
};

function formatDate(dt: number) {
    const date = new Date(dt);
    const options: Intl.DateTimeFormatOptions
        = { weekday: "long", day: "numeric", month: "short" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
}

function formatShortDate(dt: number) {
    const date = new Date(dt);
    const options: Intl.DateTimeFormatOptions
        = { day: "numeric", month: "short" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
}

function QualitativeName(index: number) {
    switch (index) {
        case 1:
            return "Good";
        case 2:
            return "Fair";
        case 3:
            return "Moderate";
        case 4:
            return "Poor";
        case 5:
            return "Very Poor";
        default:
            return "Good";
    }
}

function QualitativeBg(aqi: number) {
    switch (aqi) {
        case 1:
            return "#89e589";
        case 2:
            return "#e5dd89";
        case 3:
            return "#e5c089";
        case 4:
            return "#e58989";
        case 5:
            return "#e589b7";
        default:
            return "#89e589";
    }
}

type Data = {
    dt_txt: string;
    weather: { icon: string }[];
    dt: number;
    city: {
        sunrise: number;
        sunset: number;
        name: string;
        country: string;
        coord: { lat: number; lon: number };
    };
    list: {
        dt: number;
        components: {
            co: number;
            nh3: number;
            no: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
        };
        main: {
            aqi: number;
            humidity: number;
            pressure: number;
            feels_like: number;
            temp: number;
        };
        visibility: number;
        weather: {
            icon: string
            description: string
        }[];
        wind: { speed: number };
        dt_txt: number;
    }[];
};

type Data1 = {
    list: {
        components: {
            co: string;
            nh3: string;
            no: string;
            no2: string;
            o3: string;
            so2: string;
            pm2_5: string;
            pm10: string;
        };
        main: { aqi: number };
    }[];
};

interface Icon {
    [key: string]: string;
}

export { icon, debounce, formatDate, formatShortDate, QualitativeName, QualitativeBg };

export type { Data, Data1, Icon };
