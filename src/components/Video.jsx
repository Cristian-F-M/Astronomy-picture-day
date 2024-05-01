export function Video({ url }) {
    return (
        <iframe
            className="size-full aspect-video"
            src={`${url}rel=0&autoplay=1`}
            frameborder="0"
            allow="autoplay=1; fullscreen"
            
        ></iframe>
    );
}
