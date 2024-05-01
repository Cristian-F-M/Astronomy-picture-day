import { Image } from "./Image";
import { Video } from "./Video";

export function Media({ AstronomyPicture }) {
    return (
        <>
            {AstronomyPicture.media_type === "video"
                ? <Video  url={AstronomyPicture.url}/>
                : AstronomyPicture.media_type === "image" && (
                  <Image  url={AstronomyPicture.url} title={AstronomyPicture.title} />
                )}
        </>
    );
}
