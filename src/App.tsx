import React, { useEffect } from 'react';
import classes from './app.module.css';
import MyDiv from './components/div/div';
import { fetchApi, postApi } from './store/apiSlice';
import { useAppSelector, useAppDispatch } from './store/hooks';

function App() {
    const data = useAppSelector((state) => state.api.results.data);
    const loading = useAppSelector((state) => state.api.loading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchApi());
    }, [dispatch]);

    return (
        <>
            <div className={classes.card_container}>
                {loading ? (
                    <p>Загрузка...</p>
                ) : data ? (
                    data.map((e, index) => <MyDiv id={index} key={index} />)
                ) : (
                    <p>Ничего нет</p>
                )}
            </div>
            {/* <div className={classes.btn_container}> */}
            <button className={classes.save_btn} onClick={() => dispatch(postApi(data))}>
                Сохранить
            </button>
            {/* </div> */}
        </>
    );
}

export default App;
