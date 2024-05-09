import { useId } from "react";

export function Header({ date, handleChangeDate }) {
    const dateId = useId();

    const handleClickDate = ({ target }) => {
        target.showPicker();
    };

    return (
        <>
            <header className="mt-2 font-semibold flex items-center flex-col">
                <h1 className='text-2xl md:text-4xl text-center text-balance'>Astronomy Picture of the Day</h1>
                <form action="" className="mt-2 w-fit text-xl">
                    <label htmlFor={dateId}>
                        <input
                            onClick={handleClickDate}
                            onChange={handleChangeDate}
                            id={dateId}
                            type="date"
                            value={date}
                            max={new Date().toISOString().split('T')[0]}
                            className="bg-transparent text-base md:text-xl"
                        />
                    </label>
                </form>
            </header>
        </>
    );
}
