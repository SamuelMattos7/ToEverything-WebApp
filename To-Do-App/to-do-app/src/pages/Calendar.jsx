import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Nav from '../components/Nav'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Calendar() {

    const [task, setTask] = useState([ ]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/task/calendar/', {
                    headers:{Authorization: `Bearer ${localStorage.getItem('accessToken')}`},
                });
                setTask(response.data);
            } catch (error) {
                console.log('Error detected: ', error);
                setError(error);
            }
        };
        fetchTasks();
    }, []);
    
    return(
        <div>
            <Nav/>
            <div className='lg:container mx-auto py-4'>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    events={task.map(t => (
                        {title: t.task_name, date:t.end_date}
                    ))}
                />
            </div>
        </div>
    )

}