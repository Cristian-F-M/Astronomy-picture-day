import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Header } from "@/components/Header";

const NASA_API_KEY = "ovzhSZfj5su2vsxb5GFmYHmfJhK6WDjoQC6PH4T6";

export function AstronomyPicture() {
    const [date, setDate] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get("date") ?? formatDate({ date: new Date() });
    });
    const [AstronomyPicture, setAstronomyPicture] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorDescription, setErrorDescripcion] = useState(null);
    const [error, setError] = useState(false);
    const previousDate = useRef(date);

    useEffect(() => {
        fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.code === 400) {
                    setError(true);
                    setErrorDescripcion(
                        "La fecha está en un formato no valido (yyyy-mm-dd)"
                    );
                }

                setAstronomyPicture(data);
            })
            .catch((err) => {
                setError(true);
                setErrorDescripcion(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [date]);

    useEffect(() => {
        const newPathName = `?date=${date}`;
        window.history.pushState({}, "", newPathName);
    }, [date]);

    const handleChangeDate = ({ target }) => {
        if (previousDate.current === target.value) return;

        setLoading(true);
        setDate(target.value);
        setError(false);
    };

    return (
        <>
            <Header date={date} handleChangeDate={handleChangeDate} />

            <main className="w-full lg:max-w-[1200px] mt-8 flex flex-col items-center min-h-[700px]">
                {loading && <p className="mt-8 text-3xl">Cargando...</p>}
                {error && (
                    <p className="mt-8 text-3xl">
                        {errorDescription ??
                            "Un error a ocurrido, intenta recargar la pagina :) ."}
                    </p>
                )}

                {AstronomyPicture && !loading && (
                    <>
                        <h2 className="text-3xl">{AstronomyPicture.title}</h2>
                        <div className="flex items-center flex-col gap-5 lg:flex-row mt-1">
                            <figure className="mt-5 w-[50%] relative h-[550px]  overflow-hidden">
                                <a href={AstronomyPicture.hdurl} target="_blank" className='[&>img]:hover:scale-110 block' title='Open in another tap'>
                                    <img
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out cursor-pointer full-screen"
                                        src={AstronomyPicture.url}
                                        alt={AstronomyPicture.title}
                                    />
                                </a>
                                {AstronomyPicture.copyright && (
                                    <span className="absolute bottom-0 left-0 p-2 rounded-tl-xl">
                                        {AstronomyPicture.copyright}
                                    </span>
                                )}
                            </figure>
                            <p className="w-[50%] text-pretty text-lg">
                                {AstronomyPicture.explanation}
                            </p>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}
