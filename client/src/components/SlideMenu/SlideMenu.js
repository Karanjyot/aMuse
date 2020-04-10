import React from 'react'
import './slideMenu.css'
/**
* @author
* @function SlideMenu
**/

const SlideMenu = (props) => {

  let drawerClasses = 'side-drawer'
    if(props.show) {
       drawerClasses = 'side-drawer open'
    }
  return(
    <div className = {drawerClasses}>
      <h3>Account Menu</h3>
    </div>
   )

 }

export default SlideMenu