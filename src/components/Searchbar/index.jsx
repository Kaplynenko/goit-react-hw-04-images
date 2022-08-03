import { useState } from "react"
import { toast } from 'react-toastify';
import styles from '../Searchbar/styles.module.css'
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';


const Searchbar=({onHandlSubmit})=>{
const [searchValue,setSearchValue]=useState('')
    
  const  handleChange =e=>{
        setSearchValue(e.currentTarget.value.toLowerCase())
    }
  const  handleSubmit = event => {
        event.preventDefault();
        
    
        if (searchValue.trim() === '') {
          toast.error('Please enter a search request');
          return;
        }
    
        onHandlSubmit(searchValue);
        setSearchValue('')
      };


return(
<header className={styles.searchbar}>
  <form className={styles.form} onSubmit={handleSubmit}>
    <button className={styles.button} type="submit">
      <span className={styles.buttonLabel} >Search</span>
    </button>

    <input
       className={styles.input}
      value={searchValue}
      onChange={handleChange}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>)}
Searchbar.propTypes = {
  onHandlSubmit: PropTypes.func,
};

export default Searchbar