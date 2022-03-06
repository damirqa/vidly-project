// import React, { Component } from 'react';

// class Button extends Component {
    
//     render() { 
//         return (
//             <button 
//                 className={this.props.type}
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.title}
//             </button>
//         );
//     }
// }
 
// export default Button;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({validate, type, label, link}) => {
    const navigate = useNavigate();
    return (
        <button disabled={validate} className={type} onClick={() => navigate(link)}>{label}</button>
    );
}
 
export default Button;