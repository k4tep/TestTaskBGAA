import React from 'react';
import classes from './div.module.css';
import { blueGrey } from '@mui/material/colors';
import MyTable from '../table/table';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { IData } from '../../interfaces/data';
import { useAppSelector } from '../../store/hooks';

function MyDiv(props: { id: number }) {
    const data = useAppSelector((state) => state.api.results.data);

    return (
        <div className={classes.card}>
            <div className={classes.title_container}>
                <MenuBookIcon sx={{ color: blueGrey[900] }} />
                <h1>{data[props.id].subjectName}</h1>
            </div>
            <div className={classes.info_container}>
                <div className={classes.info}>
                    <h3>Группа</h3>
                    <p>{data[props.id].groupName}</p>
                </div>
                <div className={classes.info}>
                    <h3>Количество курсантов</h3>
                    <p>{data[props.id].studentsNumber}</p>
                </div>
                <div className={classes.info}>
                    <h3>Курс</h3>
                    <p>{data[props.id].course}</p>
                </div>
                <div className={classes.info}>
                    <h3>Семестр</h3>
                    <p>{data[props.id].semestr}</p>
                </div>
            </div>
            <hr />
            <MyTable id={props.id} />
        </div>
    );
}

export default MyDiv;
