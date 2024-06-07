import React from 'react';
import './schedule.css';

const Schedule = ({ data }) => {
    
    console.log(data)
    const renderSchedule = () => {
        return data.map((item, index) => {
            return (
                <div key={index} className='hour-container'>
                    <div className='time'>{item.hora}</div>
                    <div className='car-number'>{item.matricula}</div>
                </div>
            );
        })
    }
    return (
        <div className='schedule-container'>
            <div className='header-container'>
                <div className='info-container'>
                    <span>🕘</span>
                    <h1 className='info-header'> HORARIOS</h1>
                </div>
                <div className='info-container'>
                    <span></span>
                    <h1 className='info-header'> TALLER</h1>
                </div>
            </div>
            <div className='times-container'>
                { renderSchedule() }
            </div>
            <div className='footer-container'>
                <img src='http://localhost:3000/logo/gelkor-logo.jpg' alt='Logo' className='logo' />
            </div>
        </div>
    );
};

export default Schedule;