"use client"
import styles from '../styles/Filters.module.css'
import {useState} from "react";
import {FaFilter} from "react-icons/fa";



const TicketFilter = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    }

  return(
      <div className={styles.filterContainer}>
          <div className={styles.filerWrapper}>

              <div className={`${styles.filter} ${isFilterOpen ? styles.visible : styles.hidden}`}>
                  <span className={styles.filterText}>Filter Tickets:</span>
                  <select name="club" className={styles.select}>
                      <option>Club1</option>
                      <option>Club2</option>
                      <option>Club3</option>
                  </select>
                  <input type="date" className={styles.datePicker} />
              </div>
              <div className={styles.filterIcon} onClick={toggleFilter}>
                  <FaFilter/>
              </div>
          </div>

          <div className={styles.sort}>
              <span className={styles.filterText}>Sort Tickets:</span>
              <select name="club" className={styles.select}>
                  <option>Price (asc)</option>
                  <option>Price (desc)</option>
              </select>
          </div>
      </div>
  )
}
export default TicketFilter