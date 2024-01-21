"use client"
import React, { useState, useEffect } from 'react';

//********Grabbing the book id's from the MongoDB*******
//*****This is mainly used for the save and delete buttons*******

const useBookIds = () => {
  const [bookIds, setBookIds] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('https://nextjs-book-app.vercel.app/api/books', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await res.json();
      const extractedBookIds = result.books.map((item) => item.bookId);
      setBookIds(extractedBookIds);
      setShouldFetchData(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
      fetchData();
  }, []);

  return { bookIds, fetchData };
};

export default useBookIds;
