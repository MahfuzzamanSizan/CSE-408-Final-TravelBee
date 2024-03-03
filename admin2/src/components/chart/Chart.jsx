import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


// const data = [
//   { name: "January", Total: 1200 },
//   { name: "February", Total: 2100 },
//   { name: "March", Total: 800 },
//   { name: "April", Total: 1600 },
//   { name: "May", Total: 900 },
//   { name: "June", Total: 1700 },
// ];

const Chart = ({ aspect, title }) => {
  const [hotelData, setHotelData] = useState([])
  const {data} = useFetch("/hotels");
  const hotelNames = data.map(hotel => hotel.name);

  // console.log(hotelNames); 

  const handleHotelRevenue = async (hotel) => {
    const res = await fetch(`/orders/get/revenueby/hotel/${hotel}`);
    const data = await res.json();
    // console.log(data);
    return data;
  }
  
  hotelNames.map(hotel => {
    // console.log(hotel);
    handleHotelRevenue(hotel);
  })


  useEffect(() => {
    const fetchHotelRevenue = async () => {
      try {
        const hotelNames = (await fetch("/hotels")).map((hotel) => hotel.name);
        const hotelRevenueData = await Promise.all(
          hotelNames.map(async (hotel) => ({
            name: hotel,
            revenue: await handleHotelRevenue(hotel),
          }))
        );
        setHotelData(hotelRevenueData);
      } catch (error) {
        console.error("Error fetching hotel revenue:", error);
      }
    };

    fetchHotelRevenue();
  }, []);


 


  console.log(hotelData)




  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={hotelData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );


};


export default Chart;
