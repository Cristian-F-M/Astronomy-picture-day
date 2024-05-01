export function Image({ url, title }) {
    return (
        <img
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out cursor-pointer full-screen aspect-video"
            src={url}
            alt={title}
        />
    );
}
