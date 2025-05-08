import axios from 'axios';

const test = async () => 
{
  try 
  {
    const response = await axios.get('http://localhost:3000/artist?name=drake');
    console.log('Response from server:\n', response.data);
  } catch (err) 
  {
    console.error('Error calling /artist route:', err.message);
  }
};

test();