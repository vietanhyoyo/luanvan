import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './styles.scss'
import ClassService from 'services/objects/class.service';
import { useEffect, useState } from 'react';

const classService = new ClassService();

const HeaderLink = () => {

    const urlLink = '/student/lesson/';
    const [link, setLink] = useState(urlLink + "63049c20e2a1574593437718");

    const getClass = async () => {
        try {
            const result = await classService.getClassOfStudent();
            const doc = result.data;
            if (doc.class !== null) {
                setLink(urlLink + doc.class);
                console.log(doc);
            } else {
                setLink("/student/home/");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getClass();
    }, [])


    return (<>
        <Link to={link} >
            <Typography
                className="headerlink-link"
                variant="button"
            >NỘI DUNG HỌC</Typography>
        </Link>
    </>)
}

export default HeaderLink