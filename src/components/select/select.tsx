import React, { createRef } from 'react';
import classes from './select.module.css';
import { addTeacher, pasteTeacher } from '../../store/apiSlice';
import { blueGrey } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import { IPodgroups } from '../../interfaces/data';

function MySelect(props: {
    id: number;
    podgroup: number;
    hours: string;
    studyType: string;
    firstSelect: boolean;
}) {
    const teachers = useAppSelector((state) => state.api.results.teachers);
    const data = useAppSelector((state) => state.api.results.data);
    const selectRef = createRef<HTMLSelectElement>();

    const dispatch = useAppDispatch();
    const addTeacherToClass = () => {
        const podgroup = props.podgroup;
        const id = props.id;
        const studyType = props.studyType + 'Teacher';
        const teacherId = selectRef.current?.value;
        dispatch(addTeacher({ id, studyType, podgroup, teacherId }));
    };
    const pasteTeacherToAllClasses = () => {
        const podgroup = props.podgroup;
        const id = props.id;
        const studyType = props.studyType + 'Teacher';
        const teacherId = selectRef.current?.value;
        dispatch(pasteTeacher({ id, studyType, podgroup, teacherId }));
    };

    return (
        <>
            {props.hours === '0' ? (
                <select disabled className={classes.select} name="Teacher" id={props.studyType}>
                    <option value="">Вакансия</option>
                </select>
            ) : (
                <select
                    className={props.firstSelect ? classes.select_first : classes.select}
                    name="Teacher"
                    id={props.studyType}
                    onChange={addTeacherToClass}
                    ref={selectRef}
                >
                    <option value="">Вакансия</option>
                    {teachers.map((e) =>
                        data[props.id].podgroups[props.podgroup][
                            `${props.studyType}Teacher` as keyof IPodgroups
                        ] === e.id ? (
                            <option selected value={e.id} key={e.id}>
                                {e.name}
                            </option>
                        ) : (
                            <option value={e.id} key={e.id}>
                                {e.name}
                            </option>
                        )
                    )}
                </select>
            )}
            {props.firstSelect ? (
                <div onClick={pasteTeacherToAllClasses} className={classes.fill_selects}>
                    <FormatLineSpacingIcon sx={{ color: blueGrey[50] }} />
                </div>
            ) : null}
        </>
    );
}

export default MySelect;
