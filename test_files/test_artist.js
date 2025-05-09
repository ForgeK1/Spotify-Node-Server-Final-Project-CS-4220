import axios from 'axios';

const testArtistByName = async () => 
{
  try 
  {
    const response = await axios.get('http://localhost:3000/artist?name=Eminem');
    console.log('Response from server:\n', response.data);
  } catch (err) 
  {
    console.error('Error calling /artist route:', err.message);
  }
};

testArtistByName();

const testArtistByID = async () => 
  {
    try 
    {
      //27109283 is a placeholder and is not a known artist ID
      const response = await axios.get('http://localhost:3000/artist/27109283');
      console.log('Response from server:\n', response.data);
    } catch (err) 
    {
      console.error('Error calling /artist route:', err.message);
    }
  };
  

//testArtistByID();

