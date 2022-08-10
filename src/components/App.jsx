import Searchbar from './Searchbar'
import ImageGallery from './ImageGallery'
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import { useState,useEffect,useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import fetchPictures from './services/pixabayAPI';

const App =()=> {
  const [pictures,setPictures]= useState('')
  const [pageNumber,setPageNumber]=useState(1)
const [gallery,setGallery]=useState([])
  const [loading,setLoading]= useState(false)
const [showModal,setShowModal] = useState(false)
    const [largePicture,setLargePicture] =useState('')

    useMemo(()=>{
  if (!pictures) {
    return;
  }
  
  setLoading(true)
  setPageNumber(1)  
  fetchPictures(pictures)
        .then(res => {
          if (res.length === 0) {
            toast.error('Please enter a valid request');
          }

          setGallery(res)
        })
        .catch(error => console.log(error))
        .finally(() =>setLoading(false));
},[pictures])

useEffect(()=>{
      if (pageNumber=== 1) {
      return;}
setLoading(true);
      fetchPictures(pictures, pageNumber)
        .then(res => {
          setGallery(state=>[...state,...res])
          })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));

},[pictures,pageNumber]);

  

    
      
    
    
  
  const handlePictureSubmit = pictures => {
    setPictures(state=>[...state,pictures]);
    
    setPageNumber(1);
    setGallery([]);
  };

 const openModal = e => {
  setShowModal(true)
    setLargePicture(e.largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false)
  };
  
  const loadMore = () => setPageNumber(state => state + 1)
   
  

  
  
 
    return (
    <div>
      <Searchbar onHandlSubmit={handlePictureSubmit}/>
      {gallery.length !== 0 && (
          <ImageGallery gallery={gallery} handleModal={openModal} />
        )}
        {loading && <Loader />}
        {gallery.length !== 0 && gallery.length >= 12 && (
          <Button loadMore={loadMore} />
        )}
        
        {showModal && (
          <Modal onClose={closeModal} largePicuretoModal={largePicture} />
        )}


      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
    </div>
  );}
  

export default App;