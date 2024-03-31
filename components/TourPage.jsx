'use client';
import { getAllTours } from '@/utils/action';
import { useQuery } from '@tanstack/react-query';
import TourList from './TourList';
import { useState } from 'react';

const ToursPage = () => {
    const [searchValue,setSearchValue] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ['tours',searchValue],
    queryFn: () => getAllTours(searchValue),
  });

  return (
    <>
    <form className='max-w-lg mb-12'>
        <div className='join w-full'>
            <input
              type='text'
              placeholder='entry city or country here'
              className='input input-bordered join-item w-full'
              value={searchValue}
              required
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className='btn btn-primary join-item' type='button' disabled={isPending} onClick={()=>setSearchValue('')}>{isPending?'please Wait':'reset'}</button>
        </div>
    </form>
      {isPending ? (
        <span className=' loading'></span>
      ) : (
        <TourList data={data} />
      )}
    </>
  );
};
export default ToursPage;
