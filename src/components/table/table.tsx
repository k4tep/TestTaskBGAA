import React from 'react';
import classes from './table.module.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { blueGrey } from '@mui/material/colors';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addPodgroup, removePodgroup } from '../../store/apiSlice';
import MySelect from '../select/select';

function MyTable(props: { id: number }) {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.api.results.data);

    const addNewPodgroup = () => {
        dispatch(addPodgroup(props.id));
    };

    const removeNewPodgroup = () => {
        dispatch(removePodgroup(props.id));
    };

    return (
        <div className={classes.grid_container}>
            <div className={data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid}>
                <h2>Занятие</h2>
                <h2>Часы</h2>
                {data[props.id].countPodgroups === '1' ? (
                    <h2 className={classes.add}>
                        Преподаватель
                        <div className={classes.add_container} onClick={addNewPodgroup}>
                            <AddIcon sx={{ color: blueGrey[900] }} />
                        </div>
                    </h2>
                ) : (
                    <h2 className={classes.add}>Подгруппа 1</h2>
                )}
                {data[props.id].countPodgroups === '2' ? (
                    <h2 className={classes.add}>
                        Подгруппа 2
                        <div className={classes.add_container} onClick={removeNewPodgroup}>
                            <DeleteIcon sx={{ color: blueGrey[900] }} />
                        </div>
                    </h2>
                ) : null}
            </div>
            <div className={data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid}>
                <p>Лекции</p>
                <p>{data[props.id].lecturesHours}</p>
                <div className={classes.input_container}>
                    <MySelect
                        id={props.id}
                        hours={data[props.id].lecturesHours}
                        studyType="lecture"
                        firstSelect={true}
                        podgroup={0}
                    />
                </div>
                {data[props.id].countPodgroups === '2' ? (
                    <div className={classes.input_container}>
                        <MySelect
                            id={props.id}
                            hours={data[props.id].lecturesHours}
                            studyType="lecture"
                            firstSelect={true}
                            podgroup={1}
                        />
                    </div>
                ) : null}
            </div>
            <div className={data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid}>
                <p>Лабораторные работы</p>
                <p>{data[props.id].laboratoryHours}</p>
                <MySelect
                    id={props.id}
                    hours={data[props.id].laboratoryHours}
                    studyType="laboratory"
                    firstSelect={false}
                    podgroup={0}
                />
                {data[props.id].countPodgroups === '2' ? (
                    <MySelect
                        id={props.id}
                        hours={data[props.id].laboratoryHours}
                        studyType="laboratory"
                        firstSelect={false}
                        podgroup={1}
                    />
                ) : null}
            </div>
            <div className={data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid}>
                <p>Практические</p>
                <p>{data[props.id].practicHours}</p>
                <MySelect
                    id={props.id}
                    hours={data[props.id].practicHours}
                    studyType="practice"
                    firstSelect={false}
                    podgroup={0}
                />
                {data[props.id].countPodgroups === '2' ? (
                    <MySelect
                        id={props.id}
                        hours={data[props.id].practicHours}
                        studyType="practice"
                        firstSelect={false}
                        podgroup={1}
                    />
                ) : null}
            </div>
            <div className={data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid}>
                <p>Семинарские</p>
                <p>{data[props.id].seminarHours}</p>
                <MySelect
                    id={props.id}
                    hours={data[props.id].seminarHours}
                    studyType="seminar"
                    firstSelect={false}
                    podgroup={0}
                />
                {data[props.id].countPodgroups === '2' ? (
                    <MySelect
                        id={props.id}
                        hours={data[props.id].seminarHours}
                        studyType="seminar"
                        firstSelect={false}
                        podgroup={1}
                    />
                ) : null}
            </div>

            {data[props.id].exam ? (
                <div
                    className={
                        data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid
                    }
                >
                    <p>Экзамен</p>
                    <p> </p>
                    <MySelect
                        id={props.id}
                        hours=" "
                        studyType="exam"
                        firstSelect={false}
                        podgroup={0}
                    />
                    {data[props.id].countPodgroups === '2' ? (
                        <MySelect
                            id={props.id}
                            hours=" "
                            studyType="exam"
                            firstSelect={false}
                            podgroup={1}
                        />
                    ) : null}
                </div>
            ) : null}

            {data[props.id].offset ? (
                <div
                    className={
                        data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid
                    }
                >
                    <p>Зачет</p>
                    <p> </p>
                    <MySelect
                        id={props.id}
                        hours=" "
                        studyType="offset"
                        firstSelect={false}
                        podgroup={0}
                    />
                    {data[props.id].countPodgroups === '2' ? (
                        <MySelect
                            id={props.id}
                            hours=" "
                            studyType="offset"
                            firstSelect={false}
                            podgroup={1}
                        />
                    ) : null}
                </div>
            ) : null}

            {data[props.id].countPodgroups === '2' ? (
                <div className={classes.gridAdd}>
                    <p>Количество человек</p>
                    <p> </p>
                    <input
                        placeholder={data[props.id].podgroups[0].countStudents}
                        className={classes.input_count}
                    ></input>
                    <input
                        placeholder={data[props.id].podgroups[1].countStudents}
                        className={classes.input_count}
                    ></input>
                </div>
            ) : null}

            <div className={data[props.id].countPodgroups === '2' ? classes.gridAdd : classes.grid}>
                <p>
                    Примечание <br />
                    (для сосотавления расписания)
                </p>
                <p> </p>
                <input className={classes.input}></input>
            </div>
        </div>
    );
}

export default MyTable;
