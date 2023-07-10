import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Crud = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3030/users');
      setData(result.data);
    };
    fetchData();
  }, []);

  const addData = async (newData) => {
    const result = await axios.post('http://localhost:3030/users', newData);
    setData([...data, result.data]);
  };

  const updateData = async (id, updatedData) => {
    const result = await axios.put(
      `http://localhost:3030/users/${id}`,
      updatedData
    );
    const updatedList = data.map((item) => {
      if (item.id === id) {
        return result.data;
      }
      return item;
    });
    setData(updatedList);
  };

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:3030/users/${id}`);
    const updatedList = data.filter((item) => item.id !== id);
    setData(updatedList);
  };

  return (
    <div>
      <p>
        Note: Disini akan diimplementasikan penerapan CRUD menggunakan db.json
      </p>
      <ol>
        {data.map((item) => (
          <div key={item.id}>
            <li>{item.name}</li>
            <li>{item.email}</li>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = e.target.elements.name.value;
                const email = e.target.elements.email.value;
                const newData = { name, email }; // Ganti sesuai dengan struktur data yang Anda gunakan
                updateData(item.id, newData);
                e.target.reset();
              }}
            >
              <input type='text' name='name' placeholder='Enter name' />
              <input type='email' name='email' placeholder='Enter email' />
              <button type='submit'>Update</button>
            </form>
            <button type='button' onClick={() => deleteData(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </ol>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.elements.name.value;
          const email = e.target.elements.email.value;
          const newData = { name, email }; // Ganti sesuai dengan struktur data yang Anda gunakan
          addData(newData);
          e.target.reset();
        }}
      >
        <input type='text' name='name' placeholder='Enter name' />
        <input type='email' name='email' placeholder='Enter email' />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default Crud;
