import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from '@ant-design/plots';
import Navbar from '../Navbar/Navbar';
import BarChart from './BarChart';
import './Charts.css';
import image from '../../Assets/pic.svg';

const DemoLine = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        chartData();
        const d = new Date();
        setDay(t('dayNames.' + getDayName(d.getDay())));
        setYear((d.getFullYear() + 1).toString());
    }, [t]);

    const getDayName = (dayIndex) => {
        switch (dayIndex) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            default:
                return '';
        }
    };

    const chartData = () => {
        fetch('https://d4ad-2405-205-1482-fa00-943c-798-b5a8-1b5a.in.ngrok.io/shop')
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                console.log(json);
                // Process your data here
            })
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };

    const config = {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            tickCount: 5,
        },
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='charts-analytics'>
                <div className='bar'>
                    <br />
                    <BarChart />
                    <div>
                        <h3>{day} {t('predictionLabel', { year })}</h3>
                    </div>
                </div>
                <div className='line'>
                    <br />
                    <br />
                    <Line {...config} />
                    <div>
                        <h3 className='prediction'> {t('predictionLabel', { year: year })}</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DemoLine;
