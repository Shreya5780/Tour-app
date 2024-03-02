import { useContext, useEffect, useState } from "react";
import { ImCross } from 'react-icons/im';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const EditTour = () => {

    const tourId = useParams().id;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [distance, setDistance] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [maxGroupSize, setMaxGroupSize] = useState("");
    const [featured, setFeatured] = useState(false);

    const fetchTour = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/tours/getSingleTour/${tourId}`);
        console.log("res")
        console.log(res.data)
        setTitle(res.data.title);
        console.log("title")
        console.log(setTitle)
        console.log(res.title)

        setCity(res.data.city);
        setAddress(res.data.address);
        setDistance(res.data.distance);
        setDesc(res.data.desc);
        setPrice(res.data.price);
        setMaxGroupSize(res.data.maxGroupSize);
        setFeatured(res.data.featured);
      }
      catch(err) {
        console.log(err);
      }
    }

    const handleUpdate = async (e) => {
      e.preventDefault();
      const tour = {
        title,
        city,
        address,
        distance,
        desc,
        price,
        maxGroupSize,
        featured
      };

      try {
        const res = await axios.put(`${BASE_URL}/api/tours/updateTour/${tourId}`, tour, { withCredentials: true });
        navigate("/tours/" + res.data._id);
      }
      catch(err) {
        console.log(err);
      }
    }

    useEffect(() => {
      fetchTour();
    }, [tourId]);

    return (
      <div>
          <div className='px-6 md:px-[200px] mt-8'>
          <h1 className='font-bold md:text-2xl text-xl '>Update a Tour</h1>
          <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text"  className='px-4 py-2 outline-none'/>

            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter tour title' className='px-4 py-2 outline-none'/>
            <input onChange={(e) => setCity(e.target.value)} value={city} type="text" placeholder='Enter city' className='px-4 py-2 outline-none'/>
            <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder='Enter address' className='px-4 py-2 outline-none'/>
            <input onChange={(e) => setDistance(e.target.value)} value={distance} type="text" placeholder='Enter distance' className='px-4 py-2 outline-none'/>
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" placeholder='Enter price' className='px-4 py-2 outline-none'/>
            <input onChange={(e) => setMaxGroupSize(e.target.value)} value={maxGroupSize} type="text" placeholder='Enter max group size' className='px-4 py-2 outline-none'/>
            <label>
              <input type="checkbox" onChange={(e) => setFeatured(e.target.checked)} checked={featured} />
              Featured
            </label>
            <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none' placeholder='Enter tour description'/>
            <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
          </form>

          </div>
      </div>
    );
}

export default EditTour;
