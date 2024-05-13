import { useEffect, useRef, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Header } from "@/components/Header";
import { Media } from "@/components/Media";

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
                        <h2 className="text-xl  md:text-3xl text-center text-balance">{AstronomyPicture.title}</h2>
                        <div className="flex flex-col gap-8 lg:flex-row mt-1 items-start">
                            <figure className="mt-5 w-[95%] md:w-[70%] relative h-auto overflow-hidden">
                                <a
                                    href={AstronomyPicture.hdurl || AstronomyPicture.url}
                                    target="_blank"
                                    className="[&>img]:hover:scale-105 block size-full"
                                    title="Open in another tap"
                                >
                                    <Media AstronomyPicture={AstronomyPicture} />
                                </a>
                                {AstronomyPicture.copyright && (
                                    <span className="absolute bottom-0 left-0 px-1 text-black text-sm md:text-base text-pretty bg-white/20 backdrop-blur-sm">
                                        {AstronomyPicture.copyright}
                                    </span>
                                )}
                            </figure>
                            <p className="w-full md:w-[50%] text-base md:text-lg text-center md:text-start text-pretty px-5 md:p-0">
                                {AstronomyPicture.explanation}
                            </p>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}
