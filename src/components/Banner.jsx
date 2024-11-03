import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import http from '../helpers/http';

function Banner() {
    const token = useSelector(state => state.auth.token.token);
    const [banner, setBanner] = useState([]);
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const startDragging = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Adjust scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };
  
    const getBanner = async (token) =>{
      try {
        const {data} = await http(token).get('/banner');
        setBanner(data.data); 
      } catch (error) {
        const message = error?.response?.data?.message;
        return message;
      }
    };
  
    useEffect(()=>{
      getBanner(token);
    }, [token]);

    return (
        <div className="flex flex-col gap-2 w-full pb-10">
            <p className="text-black text-md font-semibold">Temukan promo terbaik</p>
            <div
                className="flex w-full snap-x snap-mandatory overflow-x-scroll scrollbar-hide gap-4 py-3"
                ref={scrollRef}
                onMouseDown={startDragging}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
                onMouseMove={onMouseMove}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
                {banner.map(items => (
                <div className='snap-always snap-center lg:snap-none lg:snap-align-none' key={`banner-${items.banner_name}`} >
                    <div className="h-[120px] w-[300px] rounded-lg overflow-hidden shadow-md">
                    <img src={items?.banner_image} className="w-full h-full object-cover" alt="" draggable="false" />
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Banner